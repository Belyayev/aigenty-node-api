const express = require("express");
const sql = require("mssql");
const config = require("./config");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/listings", async (req, res) => {
  try {
    // Connect to the database
    let pool = await sql.connect(config);

    // Query the database
    let result = await pool
      .request()
      .query(
        "SELECT * FROM Properties WHERE Address_City = 'Calgary' AND YearBuilt = 2007"
      );

    // Send the result as a response
    res.json(result.recordset);

    // Close the connection
    sql.close();
  } catch (err) {
    console.error("SQL error", err);
    res.status(500).send("Internal Server Error");
    sql.close();
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
