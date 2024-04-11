const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'ccscloud.dlsu.edu.ph',
  port: 20057,
  user: 'root',
  password: 'admin',
  database: 'DB_M2'
});

module.exports = pool;
