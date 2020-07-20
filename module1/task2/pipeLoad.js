const csv = require('csvtojson');
const fs = require('fs')

const csvFilePath = './task2/csv/example.csv'
const txtFilePath = './task2/fromCSV.txt'


const readStream = fs.createReadStream(csvFilePath, {
    highWaterMark: 20
});
const writeStream = fs.createWriteStream(txtFilePath, 'utf8');

const getJson = (bufferData) => {
    csv({output: "json"})
        .fromStream(bufferData)
        .subscribe((json) => {
            // console.log(json)
            writeStream.write(json)
        })
}

try {
    // readStream.pipe(csv()).pipe(writeStream);

    // getJson(readStream)

    readStream.on('data', (chunk => {
        const buf = Buffer.from(JSON.stringify(chunk));
        const temp = JSON.parse(chunk.toString());
        console.log(temp)
        writeStream.write(chunk)
    csv()
        .on('data', (data) => {
            console.log(data)

            const d = data.toString('utf8')
            console.log(d)
            writeStream.write(d)
        })
    }))

    readStream.on('close', () => console.log('Stream closed'))
    readStream.on('error', (err => console.log(`Stream error: ${err}`)))
} catch (e) {
    console.log(`Some error happened: ${e}`)
}
