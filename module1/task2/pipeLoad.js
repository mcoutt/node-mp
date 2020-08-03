const csv = require('csvtojson');
const fs = require('fs')

const csvFilePath = './task2/csv/example.csv'
const txtFilePath = './task2/fromCSV.txt'


const readStream = fs.createReadStream(csvFilePath, {
    highWaterMark: 20
});
const writeStream = fs.createWriteStream(txtFilePath, 'utf8');


try {
    readStream.pipe(csv()).pipe(writeStream);
} catch (e) {
    console.log(`Some error happened: ${e}`)
}
