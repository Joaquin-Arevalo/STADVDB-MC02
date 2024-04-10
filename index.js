const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const routes = require('./routes/routes.js');
const hbs = require('hbs');
const mysql = require('mysql');
//const database = require('./models/database.js');


const app = express();

dotenv.config();
const port = process.env.PORT;
const hostname = process.env.HOSTNAME;
app.set('view engine', 'hbs');

hbs.registerPartials(__dirname + '/views/partials')
hbs.registerHelper('eq', function (a, b){
    return a === b;
});

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static('public'));

//database.connect();

// const dbConfigs = [
//     {
//       host: 'ccscloud.dlsu.edu.ph',
//       port: 20057,
//       user: 'root',
//       password: 'admin',
//       database: 'your_database_name0' // Specify the name of your database here
//     },
//     {
//       host: 'ccscloud.dlsu.edu.ph',
//       port: 20058,
//       user: 'root',
//       password: 'admin',
//       database: 'your_database_name1' // Specify the name of your database here
//     },
//     {
//       host: 'ccscloud.dlsu.edu.ph',
//       port: 20059,
//       user: 'root',
//       password: 'admin',
//       database: 'your_database_name2' // Specify the name of your database here
//     }
// ];

// const connections = dbConfigs.map(config => mysql.createConnection(config));



app.use('/', routes);


app.use(function(req, res){
    res.status(404).send('Error 404: Page Not Found');
});

app.listen(port, hostname, function() {
    console.log(`Server running at http://${hostname}:${port}`);
});