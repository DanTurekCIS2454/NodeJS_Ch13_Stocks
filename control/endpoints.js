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
        res.status(200).json(stockData);
    });

    // --- Route: Get Stock by Symbol (Handles GET /:symbol) ---
    router.get('/:symbol', (req, res) => {
        // Extract the 'symbol' parameter from the URL.
        const requestedSymbol = req.params.symbol.toUpperCase(); 

        // Find the matching stock.
        const stock = stockData.find(s => s.symbol === requestedSymbol);

        if (stock) {
            res.status(200).json(stock);
        } else {
            res.status(404).send({ message: `Stock with symbol ${requestedSymbol} not found.` });
        }
    });

    // --- API CRUD ENDPOINTS ---
    // POST /api/stocks
    // C (Create): Creates a new company
    router.post('/', (req, res) => {
        // Request body contains the new company data
        const newStock = stockData.create(req.body);

        if (newStock.error) {
            // Handle validation error (e.g., symbol exists)
            return res.status(400).json({ message: newStock.error });
        }
    
        // Respond with the newly created company and HTTP 201 (Created)
        res.status(201).json(newCompany);
    });

    // PUT /api/stocks/:symbol
    // U (Update): Fully replaces an existing company by ID
    router.put('/:symbol', (req, res) => {
        // Update the company data using the ID from params and data from body
        const updatedStock = stockData.update(req.params.symbol, req.body);

        if (updatedStock.error) {
            // Handle error (not found or symbol conflict)
            const status = updatedStock.error.includes('not found') ? 404 : 400;
            return res.status(status).json({ message: updatedStock.error });
        }

        // Respond with the updated company and HTTP 200 (OK)
        res.status(200).json(updatedStock);
    });

    // DELETE /api/stocks/:symbol
    // D (Delete): Deletes a company by ID
    router.delete('/:symbol', (req, res) => {
        // Attempt to remove the company
        const wasRemoved = stockData.remove(req.params.symbol);

        if (wasRemoved) {
            // Respond with HTTP 204 (No Content) for successful deletion
            res.status(204).send();
        } else {
            // Respond with HTTP 404 (Not Found) if no company was deleted
            res.status(404).json({ message: 'Stock not found' });
        }
    });

    // 3. Return the configured router instance.
    return router;
};
