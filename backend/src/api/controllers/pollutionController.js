const pollutionService = require('../../services/pollutionService');

const getLocations = (req, res) => {
    try {
        const locations = pollutionService.getUniqueLocations();
        res.json({ locations });
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving locations' });
    }
};

const calculateHpiForLocation = (req, res) => {
    try {
        const { location } = req.params;
        const result = pollutionService.getHpiForLocation(location);
        if (!result) {
            return res.status(404).json({ message: `No data found for location: ${location}` });
        }
        res.json(result);
    } catch (error) {
        res.status(500).json({ message: 'Error calculating HPI' });
    }
};

const getAllData = (req, res) => {
    try {
        const allData = pollutionService.getAllDataWithHpi();
        res.json(allData);
    } catch (error) {
        console.error('Error in getAllData controller:', error);
        res.status(500).json({ message: 'Error retrieving all data' });
    }
};

/**
 * Handles adding a new data point to the dataset.
 */
const addDataPoint = async (req, res) => {
    try {
        const newData = req.body;
        // Basic validation
        if (!newData.Location || !newData.Longitude || !newData.Latitude) {
            return res.status(400).json({ message: 'Location, Longitude, and Latitude are required.' });
        }

        const addedDataWithHpi = await pollutionService.appendData(newData);
        res.status(201).json(addedDataWithHpi);
    } catch (error) {
        console.error('Error in addDataPoint controller:', error);
        res.status(500).json({ message: 'Failed to add new data point.' });
    }
};


module.exports = {
    getLocations,
    calculateHpiForLocation,
    getAllData,
    addDataPoint // Export the new handler
};

