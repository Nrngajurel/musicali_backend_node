/**
 * utility config file for connecting to the mysql database
 */
const { createPool } = require("mysql");

/**
 * if different credential for mysql database then edit the 
 * value from .env
 */
 const pool = createPool({
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.MYSQL_DB,
    connectionLimit: 10
});

module.exports = pool;

