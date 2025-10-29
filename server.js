//server.js

//required node js modules
//const http = require('http'); //http server replaced by express
//NOW IN LOADDATA const fs = require('fs'); //file system
//NOW IN LOADDATA const path = require('path'); //directory structure
//const loadData = require('./control/loadData.js');
//let stocks = loadData;

const express = require('express'); //api routes

//run instance
const app = express();


//Gemini AI to get the data
// main.js (or wherever you are using loadData)

let stocks = null;
const { getData } = require('./control/loadData'); // Import the function

// Use an async IIFE to create an awaitable context
(async () => {
    try {
        console.log('Attempting to load data...'); // This message appears first
        
        // --- THIS IS THE KEY CHANGE ---
        // 1. We call the function.
        // 2. We use 'await' to pause execution until the Promise resolves.
        stocks = await getData(); 
        
        // Once the await resolves, the console.log from loadData.js runs, 
        // THEN these messages run.
        console.log('\n✅ Successfully received data!');
        console.log('Total items loaded:', stocks.length);
        
        // Now you can safely use the data:
        // console.log(stockData[0]); 

    } catch (error) {
        console.error('\n❌ Failed to get stock data in main module:', error.message);
    }
})();

console.log('Program continues to run...'); // This runs *before* the data loading finishes!

//end Gemini AI

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

