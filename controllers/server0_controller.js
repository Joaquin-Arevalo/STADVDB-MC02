const pool = require('../models/server0_database.js');



const server0_controller = {
    get_server0: function(req, res){
        res.render('Server0');
    },
    
    insert_data_server0: async function(req, res){
        // const {apptid_b, pxid_b, RegionName_b} = req.body;
        const {pxid_b, RegionName_b} = req.body;

        pool.getConnection((err, connection) => {
            if (err) {
                console.error('Error connecting to database:', err);
                return res.status(500).send('Internal Server Error');
            }
        
            // Use the connection for database operations
            const getCountQuery = 'SELECT COUNT(*) AS rowCount FROM appointments';
            
            connection.query(getCountQuery, (countError, countResult) => {
                if (countError) {
                    console.error('Error getting row count:', countError);
                    connection.release();
                    return res.status(500).send('Internal Server Error');
                }
        
                const apptid = countResult[0].rowCount + 1; // Increment the row count to get the new pxid
        
                const insertQuery = 'INSERT INTO appointments (apptid, pxid, RegionName) VALUES (?, ?, ?)';
                const insertValues = [apptid, pxid_b, RegionName_b];
        
                connection.query(insertQuery, insertValues, (insertError, insertResult) => {
                    // Release the connection back to the pool
                    connection.release();
        
                    if (insertError) {
                        console.error('Error executing query:', insertError);
                        return res.status(500).send('Internal Server Error');
                    }
        
                    console.log('New row inserted successfully:', insertResult);
                    // Redirect to the same page to display the updated data
                    res.redirect('/server0');
                });
            });
        });
    },

    search_data_server0: async function(req, res){
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

                console.log()
                // Send the search results to the client
                res.render('Server0', { data: results }); // Assuming you have a search_results.hbs file for rendering search results
            });
        });
    }
}

module.exports = server0_controller;