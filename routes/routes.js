const controllers = require('../controllers/controller');
const server0_controllers = require('../controllers/server0_controller');
const server1_controllers = require('../controllers/server1_controller');
const server2_controllers = require('../controllers/server2_controller');


const express = require('express');
const app = express();
app.use(express.json());

app.get('/',  controllers.get_index);
app.get('/server0',  server0_controllers.get_server0);
app.get('/server1',  server1_controllers.get_server1);
app.get('/server2',  server2_controllers.get_server2);

app.post('/insert_data_server0', server0_controllers.insert_data_server0);
app.post('/search_data_server0', server0_controllers.search_data_server0);

module.exports = app;