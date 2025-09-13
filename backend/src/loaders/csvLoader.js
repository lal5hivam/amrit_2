const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

let groundwaterData = [];

exports.loadData = () => {
   
    const csvFilePath = path.join(process.cwd(), 'data', 'groundwater_data.csv');

    fs.createReadStream(csvFilePath)
      .on('error', () => {
        console.error("Error: 'data/groundwater_data.csv' not found. Please ensure the file exists in the 'data' folder.");
      })
      .pipe(csv())
      .on('data', (row) => {
        const numericRow = {};
        for (const key in row) {
            if (row[key] && !isNaN(row[key])) {
                numericRow[key] = parseFloat(row[key]);
            } else {
                numericRow[key] = row[key];
            }
        }
        groundwaterData.push(numericRow);
      })
      .on('end', () => {
        console.log('CSV file successfully processed.');
        console.log(`Loaded ${groundwaterData.length} records into memory.`);
      });
};


exports.getData = () => {
    return groundwaterData;
};
