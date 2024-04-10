const pool = require('../models/server0_database.js');



const server0_controller = {
    get_server0: function(req, res){
        res.render('Server0');
    },
    
    insert_data_server0: async function(req, res){
        const {apptid_b, pxid_b, RegionName_b} = req.body;

        pool.getConnection((err, connection) => {
            if (err) {
                console.error('Error connecting to database:', err);
                return res.status(500).send('Internal Server Error');
            }
        
            const insertQuery = 'INSERT INTO appointments (apptid, pxid, RegionName) VALUES (?, ?, ?)';
            const insertValues = [apptid_b, pxid_b, RegionName_b];
    
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
    },

    delete_data_server0: async function(req, res){
        const {apptid_b} = req.body;

        pool.getConnection((err, connection) => {
            if (err) {
                console.error('Error connecting to database:', err);
                return res.status(500).send('Internal Server Error');
            }
    
            // Use the connection for database operations
            const deleteQuery = 'DELETE FROM appointments WHERE apptid = ?';
            const deleteValues = [apptid_b];
    
            connection.query(deleteQuery, deleteValues, (deleteError, deleteResult) => {
                // Release the connection back to the pool
                connection.release();
    
                if (deleteError) {
                    console.error('Error executing delete query:', deleteError);
                    return res.status(500).send('Internal Server Error');
                }
    
                console.log('Row deleted successfully:', deleteResult);
                // Redirect to the same page to display the updated data or handle as appropriate
                res.redirect('/server0'); // Redirect to the same page or any other page
            });
        });
    },

    edit_data_server0: async function(req, res){
        const {apptid_b, pxid_b, RegionName_b} = req.body;

        pool.getConnection((err, connection) => {
            if (err) {
                console.error('Error connecting to database:', err);
                return res.status(500).send('Internal Server Error');
            }
    
            // Use the connection for database operations
            const updateQuery = 'UPDATE appointments SET pxid = ?, RegionName = ? WHERE apptid = ?';
            const updateValues = [pxid_b, RegionName_b, apptid_b];
    
            connection.query(updateQuery, updateValues, (updateError, updateResult) => {
                // Release the connection back to the pool
                connection.release();
    
                if (updateError) {
                    console.error('Error executing update query:', updateError);
                    return res.status(500).send('Internal Server Error');
                }
    
                console.log('Row updated successfully:', updateResult);
                // Redirect to the same page to display the updated data or handle as appropriate
                res.redirect('/server0'); // Redirect to the same page or any other page
            });
        });
    }
}

module.exports = server0_controller;