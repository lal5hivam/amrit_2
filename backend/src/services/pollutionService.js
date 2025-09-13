const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const { promisify } = require('util');

const appendFileAsync = promisify(fs.appendFile);

const dataFilePath = path.join(__dirname, '..', '..', 'data', 'groundwater_data.csv');
let groundwaterData = [];
let headers = [];

// Load data from CSV into memory when the module is first required
fs.createReadStream(dataFilePath)
    .pipe(csv())
    .on('headers', (h) => {
        headers = h; // Store the headers
    })
    .on('data', (row) => {
        groundwaterData.push(row);
    })
    .on('end', () => {
        console.log('CSV file successfully processed.');
    });

// --- Scientific Constants for HPI Calculation ---
const STANDARDS = { As: 10, Fe: 300, U: 30, Pb: 10, Cd: 3, Ni: 20, Cr: 50 };
const IDEAL_VALUES = { As: 0.01, Fe: 0, U: 0, Pb: 0, Cd: 0, Ni: 0, Cr: 0 };
const HEAVY_METALS = Object.keys(STANDARDS);

/**
 * Calculates the Heavy Metal Pollution Index (HPI) for a single water sample.
 * @param {object} sample - A single row object from the dataset.
 * @returns {object} An object containing the HPI score, quality, and calculation details.
 */
const calculateHpi = (sample) => {
    let weightedSum = 0;
    let totalWeight = 0;
    const calculationDetails = [];

    HEAVY_METALS.forEach(metal => {
        const concentration = parseFloat(sample[metal]);
        const standardValue = STANDARDS[metal];
        const idealValue = IDEAL_VALUES[metal];

        if (!isNaN(concentration) && standardValue) {
            const weight = 1 / standardValue;
            totalWeight += weight;
            const subIndex = ((concentration - idealValue) / (standardValue - idealValue)) * 100;
            calculationDetails.push({ metal, concentration, standardValue, idealValue, subIndexValue: subIndex });
            weightedSum += subIndex * weight;
        }
    });

    const hpi = totalWeight > 0 ? weightedSum / totalWeight : 0;
    let quality = "Unknown";
    if (hpi < 50) quality = "Excellent";
    else if (hpi < 100) quality = "Good";
    else if (hpi < 200) quality = "Slightly Polluted";
    else quality = "Unsuitable for drinking";

    return { hpi, quality, calculationDetails };
};

// --- Service Functions ---

const getUniqueLocations = () => {
    const locations = groundwaterData.map(row => row.Location);
    return [...new Set(locations)];
};

const getHpiForLocation = (location) => {
    const locationData = groundwaterData
        .filter(row => row.Location === location)
        .sort((a, b) => parseInt(b.Year) - parseInt(a.Year));

    if (locationData.length === 0) return null;

    const latestSample = locationData[0];
    const { hpi, quality, calculationDetails } = calculateHpi(latestSample);

    return {
        location: latestSample.Location,
        year: latestSample.Year,
        hpi,
        quality,
        calculationDetails,
        rawData: latestSample,
    };
};

const getAllDataWithHpi = () => {
    return groundwaterData.map(sample => {
        const { hpi, quality } = calculateHpi(sample);
        return { ...sample, hpi, quality };
    });
};

/**
 * Appends a new data record to the CSV file and in-memory array.
 * @param {object} newData - The data for the new row.
 * @returns {object} The newly added data, augmented with HPI info.
 */
const appendData = async (newData) => {
    // 1. Prepare the full data row with default values
    const fullRecord = {};
    headers.forEach(header => {
        fullRecord[header] = newData[header] || ''; // Use provided value or default to empty string
    });
    // Set current year if not provided
    fullRecord.Year = newData.Year || new Date().getFullYear();

    // 2. Format the record into a CSV string
    const csvRow = headers.map(header => {
        const value = String(fullRecord[header]);
        // Add quotes if value contains comma or quotes
        if (/[",]/.test(value)) {
            return `"${value.replace(/"/g, '""')}"`;
        }
        return value;
    }).join(',');

    // 3. Append to the CSV file
    await appendFileAsync(dataFilePath, `\n${csvRow}`);

    // 4. Add to the in-memory cache
    groundwaterData.push(fullRecord);

    // 5. Calculate HPI for the new data and return it
    const { hpi, quality } = calculateHpi(fullRecord);
    return { ...fullRecord, hpi, quality };
};

module.exports = {
    getUniqueLocations,
    getHpiForLocation,
    getAllDataWithHpi,
    appendData // Export the new function
};

