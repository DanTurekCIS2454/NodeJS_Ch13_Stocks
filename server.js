//server.js

// server.js (Revised)

console.log("Server attempt to start at " + Date().toLocaleString());

const fs = require('fs').promises;
const path = require('path');
const express = require('express');

let stocks = null;
const { getData } = require('./control/loadData');
const getStockRoutes = require('./control/endpoints'); // Import the router function

const app = express();
const port = 8080;

// Use an async IIFE to load data and then START the server
(async () => {
    try {
        console.log('Attempting to load data...');
        
        // 1. AWAIT the data loading
        stocks = await getData(); 
        
        console.log('\n✅ Successfully received data!');
        console.log('Total items loaded:', stocks.length);
        
        // --- START EXPRESS SETUP AFTER DATA IS LOADED ---
        
        // 2. Initialize routes with the loaded 'stocks' data
        const stockRoutes = getStockRoutes(stocks);

        // --- Static File Serving ---
        app.use("/static", express.static(path.join(__dirname, "public")));

        // 3. Apply the routes
        app.use('/stocks', stockRoutes); 

        // Basic route for the home page 
        app.get('/', (req, res) => {
            res.send(`Server is running on port ${port}. API endpoints are modularized.`);
        });

        // 4. Start the server only after everything is configured
        app.listen(port, () => {
            console.log(`Server listening at http://localhost:${port}`);
            console.log(`Static assets served from: http://localhost:${port}/static/`);
            console.log(`Stock API served from the modular router at: http://localhost:${port}/stocks`);
        });

    } catch (error) {
        // Log the error and exit the process if data loading failed
        console.error('\n❌ Fatal: Failed to start server due to data loading error.');
        console.error('Error:', error.message);
        process.exit(1); 
    }
})();

// Note: The original Express imports and setup are now moved inside the IIFE.