const mysql = require('mysql2');

// Create a connection pool
const pool = mysql.createPool({
  host: 'ccscloud.dlsu.edu.ph',
  port: 20058,
  user: 'root',
  password: 'admin',
  database: 'DB_M2'
});

module.exports = pool;