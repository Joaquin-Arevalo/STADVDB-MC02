const pool = require('../models/server1_database.js');

const server1_controller = {
    get_server1: function(req, res){
        res.render('Server1');
    },

    search_data_server1: async function(req, res){
        const {apptid_b} = req.body;

        pool.getConnection((err, connection) => {
            if (err) {
                console.error('Error connecting to database:', err);
                return res.status(500).send('Internal Server Error');
            }

            connection.query('SET TRANSACTION ISOLATION LEVEL READ COMMITTED;', (err) => {
                if (err) {
                    console.error('Error setting transaction isolation level:', err);
                    connection.release();
                    return res.status(500).send('Internal Server Error');
                }

                const searchQuery = 'SELECT * FROM appointments WHERE apptid = ?';
                const searchValues = [apptid_b];

                connection.query(searchQuery, searchValues, (error, results) => {

                    connection.release();

                    if (error) {
                        console.error('Error executing query:', error);
                        return res.status(500).send('Internal Server Error');
                    }

                    console.log('Search results:', results);
                    res.render('Server1', { data: results });
                });
            });
        });
    }
}

module.exports = server1_controller;
