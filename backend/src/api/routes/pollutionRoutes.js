const express = require('express');
const router = express.Router();
const pollutionController = require('../controllers/pollutionController');

// Route to get a list of all unique locations
router.get('/locations', pollutionController.getLocations);

// Route to calculate HPI for a specific location
router.get('/calculate/hpi/:location', pollutionController.calculateHpiForLocation);

// Route to get all data points with calculated HPI for heatmap
router.get('/all-data', pollutionController.getAllData);

// Route to add a new data point
router.post('/add-data', pollutionController.addDataPoint);


module.exports = router;