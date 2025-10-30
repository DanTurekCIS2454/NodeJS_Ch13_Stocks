//loadData.js for modular approach

/* Gemini AI version after trying to fix for a while */
// loadData.js (Revised)
console.log('Running loadData.js');

//path needed in server.js
const fs = require('fs/promises'); // 1. Use the Promise-based API
const path = require('path');

// Determine the correct path
const dataPath = path.join(__dirname, '../data', 'companies-data.json');

// 2. Define the data variable inside the scope or make the function return the data
let stocksCache = null; // Use a cache variable

/**
 * Loads data from the file, parses it, and caches the result.
 * @returns {Promise<Object>} The parsed stock data.
 */
async function loadAndGetStocks() {
    console.log('Loading ...');
    // Return cached data if already loaded
    if (stocksCache) {
        console.log('Return cached stocks');
        return stocksCache;
    }

    try {
        // 3. The Promise API call is now correct (no callback needed)
        const data = await fs.readFile(dataPath, { encoding: "utf-8" }); 
        stocksCache = JSON.parse(data);
        console.log('Stock data loaded');
        return stocksCache;
    }
    catch (err) {
        console.error('Unable to read stocks file:', dataPath);
        // Re-throw the error so consumers of this function know it failed
        console.log('Error: ' + err.message);
        throw new Error('Data loading failed: ' + err.message); 
    }
    console.log('Loaded and Got Stocks!'); //impossible to get here
}

// 4. Export the async function that handles loading and returning the data
module.exports = { 
    getData: loadAndGetStocks 
};

// Example of how a consumer would use it:
// (async () => {
//     try {
//         const data = await require('./loadData').getData();
//         console.log(data.length);
//     } catch (e) {
//         console.error('App failed to start:', e);
//     }
// })();