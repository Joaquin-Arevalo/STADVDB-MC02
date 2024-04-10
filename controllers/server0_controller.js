const mysql = require('mysql');
const dbConfig = {
  host: 'ccscloud.dlsu.edu.ph',
  port: 20057,
  user: 'root',
  password: 'admin', //if error try this m6AMdDYG38azWrxX4HVFRBgv
  database: 'DB_M2' // Specify the name of your server0 database here
};

const connection = mysql.createConnection(dbConfig);

const server0_controller = {
    get_server0: function(req, res){
        res.render('Server0');
    },

    search_server0: function(req, res) {
        const searchQuery = req.query.q; // Retrieve search query parameter from request URL
        
        // Construct the database query based on the search query parameter
        const sqlQuery = `SELECT * FROM appointments WHERE apptid LIKE '%${searchQuery}%'`; //change 
        
        // Execute the database query
        connection.query(sqlQuery, (error, results) => {
          if (error) {
            console.error('Error executing query:', error);
            return res.status(500).send('Internal Server Error');
          }
          // Render the server0.hbs template with the query results
          res.render('Server0', { data: results });
        });
    }
}

module.exports = server0_controller;

