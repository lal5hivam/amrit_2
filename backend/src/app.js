const express = require('express');
const cors = require('cors');
const pollutionRoutes = require('./api/routes/pollutionRoutes');
const { loadData } = require('./loaders/csvLoader');

loadData();

const app = express();

app.use(cors({ origin: 'http://127.0.0.1:5500' })); 
app.use(express.json()); 

//  API Routes 
app.use('/api', pollutionRoutes);


app.get('/', (req, res) => {
    res.json({
        message: "Welcome to the Heavy Metal Pollution Indices API (Node.js - Structured)",
        endpoints: {
            "/api/locations": "GET - Returns a list of all unique sample locations.",
            "/api/data": "GET - Returns all available groundwater data.",
            "/api/data/by_location/:location_name": "GET - Returns data for a specific location.",
            "/api/calculate/hpi/:location_name": "GET - Calculates HPI for the latest data from a specific location."
        }
    });
});


module.exports = app;