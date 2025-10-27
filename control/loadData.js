//loadData.js for modular approach

const fs = require('fs'); //file system
const path = require('path'); //directory structure

//load data
//const dataPath = path.join(__dirname, 'data', 'companies-data.json');
//have in same directory so don't need path? why won't it open though?
//moved this program to /control and updated path, still won't open file
const dataPath = path.join(__dirname, '../data', 'companies-data.json');

//store stocks in var 
let stocks;
getStocks(dataPath);

async function getStocks(dataPath) {
    try {
        const data = await fs.readFile(dataPath, "utf-8");
        stocks = JSON.parse(data);
        console.log('Stock data loaded');
    }
    catch (err) {
        console.log('Unable to read stocks file: ' + dataPath + '\n' + 'Error mesage: ' + err.message);
    }
}

function getData() {
    return stocks;
}

module.exports = { getData };

