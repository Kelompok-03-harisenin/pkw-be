const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../../.env") });

module.exports = {
  development: {
    dialect: "mysql",
    host: process.env.DATABASE_HOST || '127.0.0.1',
    port: process.env.DATABASE_PORT || 3306,
    username: process.env.DATABASE_USER || 'root',
    password: process.env.DATABASE_PASSWORD || null,
    database: process.env.DATABASE_NAME || 'database_development',
    logging: console.log, // Enable logging
  },
  // other environments...
};
