const csv = require('csvtojson');
const fs = require('fs');
const { pipeline } = require('stream');

const csvFilePath = './task2/csv/example.csv';
const txtFilePath = './task2/fromCSV.txt';


pipeline(
    fs.createReadStream(csvFilePath, {
        highWaterMark: 20
    }),
    csv({output:"json"}),
    fs.createWriteStream(txtFilePath, 'utf8'),
    (error) => {
        if (error) {
            console.error(`Happened some error: ${error}`);
        }
        console.log('Complete success');
    }
)
