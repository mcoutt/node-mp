const csvFilePath = './csv/example.csv'
const csv = require('csvtojson')

const getJson = async () => {
	return csv().fromFile(csvFilePath);
}

// return with full load in RAM for Evaluation Criteria - 3
getJson().then(res => console.log(res))


