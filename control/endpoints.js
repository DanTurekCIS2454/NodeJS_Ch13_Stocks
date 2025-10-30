//endpoints.js
/* new pass param version */
const express = require('express');

// 1. Create a new router instance
const router = express.Router();

// 2. Export a function that ACCEPTS the stockData as an argument.
// This allows the data to be loaded once in server.js and passed in here.
module.exports = function(stockData) {

    // --- Route: Get All Stocks (Handles GET /) ---
    router.get('/', (req, res) => {
        // The stockData variable is available via closure
        res.json(stockData);
    });

    // --- Route: Get Stock by Symbol (Handles GET /:symbol) ---
    router.get('/:symbol', (req, res) => {
        // Extract the 'symbol' parameter from the URL.
        const requestedSymbol = req.params.symbol.toUpperCase(); 

        // Find the matching stock.
        const stock = stockData.find(s => s.symbol === requestedSymbol);

        if (stock) {
            res.json(stock);
        } else {
            res.status(404).send({ message: `Stock with symbol ${requestedSymbol} not found.` });
        }
    });

    // 3. Return the configured router instance.
    return router;
};
