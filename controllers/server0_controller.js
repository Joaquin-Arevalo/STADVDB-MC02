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
                connection.release();
    
                if (insertError) {
                    console.error('Error executing query:', insertError);
                    return res.status(500).send('Internal Server Error');
                }
    
                console.log('New row inserted successfully:', insertResult);
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

            const searchQuery = 'SELECT * FROM appointments WHERE pxid = ?';
            const searchValues = [pxid_b];

            connection.query(searchQuery, searchValues, (error, results) => {
                connection.release();

                if (error) {
                    console.error('Error executing query:', error);
                    return res.status(500).send('Internal Server Error');
                }

                console.log()
                res.render('Server0', { data: results });
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
    
            const deleteQuery = 'DELETE FROM appointments WHERE apptid = ?';
            const deleteValues = [apptid_b];
    
            connection.query(deleteQuery, deleteValues, (deleteError, deleteResult) => {
                connection.release();
    
                if (deleteError) {
                    console.error('Error executing delete query:', deleteError);
                    return res.status(500).send('Internal Server Error');
                }
    
                console.log('Row deleted successfully:', deleteResult);
                res.redirect('/server0'); 
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
    
            const updateQuery = 'UPDATE appointments SET pxid = ?, RegionName = ? WHERE apptid = ?';
            const updateValues = [pxid_b, RegionName_b, apptid_b];
    
            connection.query(updateQuery, updateValues, (updateError, updateResult) => {
                connection.release();
    
                if (updateError) {
                    console.error('Error executing update query:', updateError);
                    return res.status(500).send('Internal Server Error');
                }
    
                console.log('Row updated successfully:', updateResult);
                res.redirect('/server0'); 
            });
        });
    }
}

module.exports = server0_controller;