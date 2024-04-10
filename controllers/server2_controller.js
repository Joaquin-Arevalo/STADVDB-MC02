const pool = require('../models/server2_database.js');

const server2_controller = {
    get_server2: function(req, res){
        res.render('Server2');
    },
}

module.exports = server2_controller;