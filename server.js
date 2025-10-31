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
        //app.get('/', (req, res) => {
        //    res.send(`Server is running on port ${port}. API endpoints are modularized.`);
        //});

        console.log("Setting ejs pages");
        // 1. Configure EJS as the templating engine
        app.set('view engine', 'ejs');
        // Specify the directory where EJS template files are located
        app.set('views', path.join(__dirname, 'views'));

        // 2. Middleware to parse incoming JSON request bodies (essential for POST/PUT)
        app.use(express.json());
        // Middleware to parse URL-encoded bodies (if forms are used)
        app.use(express.urlencoded({ extended: true }));

        // --- Routes ---

        // 3. MVC View Route (List View): Renders the initial web page
        // GET /
        app.get('/', (request, response) => {
            // Pass data and title to the EJS template ('views/companies.ejs')
            response.render('stock-grid', { stocks 
            });
        });

        // GET /manage
        app.get('/manage', (req, res) => {
            // Renders the new crudForm.ejs page
            res.render('crudForm', stocks);
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