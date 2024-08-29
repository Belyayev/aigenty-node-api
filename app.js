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

    // Base query
    let query = "SELECT * FROM Properties WHERE 1=1";
    const params = [];

    // Add filters based on query parameters
    if (req.query.SubType) {
      query += " AND SubType = @SubType";
      params.push({
        name: "SubType",
        type: sql.VarChar,
        value: req.query.SubType,
      });
    }
    if (req.query.ListPrice) {
      query += " AND ListPrice <= @ListPrice";
      params.push({
        name: "ListPrice",
        type: sql.Decimal,
        value: req.query.ListPrice,
      });
    }
    if (req.query.YearBuilt) {
      query += " AND YearBuilt = @YearBuilt";
      params.push({
        name: "YearBuilt",
        type: sql.Int,
        value: req.query.YearBuilt,
      });
    }
    if (req.query.Address_City) {
      query += " AND Address_City = @Address_City";
      params.push({
        name: "Address_City",
        type: sql.VarChar,
        value: req.query.Address_City,
      });
    }
    if (req.query.ArchitecturalStyle) {
      query += " AND ArchitecturalStyle = @ArchitecturalStyle";
      params.push({
        name: "ArchitecturalStyle",
        type: sql.VarChar,
        value: req.query.ArchitecturalStyle,
      });
    }

    // Create request and add parameters
    let request = pool.request();
    params.forEach((param) => {
      request.input(param.name, param.type, param.value);
    });

    // Execute query
    let result = await request.query(query);

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
