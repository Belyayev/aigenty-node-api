const sql = require("mssql");
const config = require("./config");

async function getData() {
  try {
    // Connect to the database
    let pool = await sql.connect(config);

    // Query the database
    let result = await pool.request().query("SELECT * FROM your_table");

    console.log(result.recordset);

    // Close the connection
    sql.close();
  } catch (err) {
    console.error("SQL error", err);
    sql.close();
  }
}

getData();
