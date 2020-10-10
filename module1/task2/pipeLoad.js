const csv = require('csvtojson');
const fs = require('fs');
const { pipeline } = require('stream');

const csvFilePath = './task2/csv/example.csv'
const txtFilePath = './task2/fromCSV.txt'


pipeline(
    fs.createReadStream(csvFilePath, {
        highWaterMark: 20
    }),
    csv({output:"json"}),
    fs.createWriteStream(txtFilePath, 'utf8'),
    (error) => {
        if (error) {
            console.error(`Happened some error: ${error}`)
        }
        console.log('Complete success')
    }
)


// try {
//     readStream.pipe(csv()).pipe(writeStream);
// } catch (e) {
//     console.log(`Some error happened: ${e}`)
// }



// const file = '../../../mock.txt'
// const wrFile = '../../../write-mock.txt'

// const rStream = fs.createReadStream(file, {
//     highWaterMark: 100000
// })
// const wStream = fs.createWriteStream(wrFile, 'utf8')
//
// rStream.on('data', (chunk => {
//     wStream.write(chunk)
// }))
//
// rStream.on('close', () => {
//     wStream.end('ending Writable Stream')
//     console.log('stream was closed')
// })
// rStream.on('error', (err => console.error(err)))
