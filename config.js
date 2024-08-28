const config = {
  user: "your_username",
  password: "your_password",
  server: "your_server.database.windows.net",
  database: "your_database",
  options: {
    encrypt: true, // Use encryption
    enableArithAbort: true,
  },
};

module.exports = config;
