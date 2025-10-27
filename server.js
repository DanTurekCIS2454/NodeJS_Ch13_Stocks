//server.js

//required node js modules
//const http = require('http'); //http server replaced by express
const fs = require('fs'); //file system
const path = require('path'); //directory structure
const express = require('express'); //api routes

//run instance
const app = express();

//load data
const dataPath = path.join(__dirname, 'data', 'companies-data.json');

//store stocks in var 
let stocks;
fs.readFile(dataPath, (err, data) =>
{
    if (err)
        console.log('Unable to read stocks file');
    else
        stocks = JSON.parse(data);
})

//replace basic server with express app
app.get('/', (request, response) => {
    response.json(stocks)
});

const port = 8080;
app.listen(port, () => {
    console.log("Server running at port=" + port);
})

//remove http server since now redundant by express app

