const pool = require('../models/server1_database.js');



const server1_controller = {
    get_server1: function(req, res){
        res.render('Server1');
    },

    search_data_server1: async function(req, res){
        const {pxid_b} = req.body;

        pool.getConnection((err, connection) => {
            if (err) {
                console.error('Error connecting to database:', err);
                return res.status(500).send('Internal Server Error');
            }

            // Use the connection for database operations
            const searchQuery = 'SELECT * FROM appointments WHERE pxid = ?';
            const searchValues = [pxid_b];

            connection.query(searchQuery, searchValues, (error, results) => {
                // Release the connection back to the pool
                connection.release();

                if (error) {
                    console.error('Error executing query:', error);
                    return res.status(500).send('Internal Server Error');
                }



                 console.log('Search results:', results); // Log the results here
                // Send the search results to the client
                res.render('Server1', { data: results }); // Assuming you have a search_results.hbs file for rendering search results
            });
        });
    }




}

module.exports = server1_controller;