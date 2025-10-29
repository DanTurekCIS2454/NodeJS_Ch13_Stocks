//server.js

//required node js modules
//const http = require('http'); //http server replaced by express
//NOW IN LOADDATA const fs = require('fs'); //file system
//NOW IN LOADDATA const path = require('path'); //directory structure
const loadData = require('./control/loadData.js');
let stocks = loadData;

const express = require('express'); //api routes

//run instance
const app = express();

//load data
//LOADDATA const dataPath = path.join(__dirname, 'data', 'companies-data.json');

//store stocks in var 
//LOADDATA let stocks;
//LOADDATA fs.readFile(dataPath, (err, data) =>
//LOADDATA {
//LOADDATA     if (err)
//LOADDATA         console.log('Unable to read stocks file');
//LOADDATA     else
//LOADDATA         stocks = JSON.parse(data);
//LOADDATA })

//replace basic server with express app
app.get('/', (request, response) => {
    response.json(stocks)
});

app.get('/stocks/:symbol', (request, response) => {
    const symbolToFind = request.params.symbol.toUpperCase();
    const matches = stocks.filter( obj => symbolToFind === obj.symbol);
    if (matches) 
        response.json(matches);
    else
        response.write("No stock found for " + symbolToFind);
})

app.get('/stocks/name/:substring', (request, response) => {
    const substringToFind = request.params.substring.toLowerCase();
    const matches = stocks.filter( obj => obj.name.toLowerCase().includes(substring));

    if (matches)
        response.json(matches);
    else
        response.write("No names found with " + substringToFind);
});


const port = 8080;
app.listen(port, () => {
    console.log("Server running at port=" + port + " on " + Date().toLocaleString());
});

//remove http server since now redundant by express app

