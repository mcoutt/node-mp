const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const initRoutes = require('./routes/index')

const app = express()
const router = express.Router()

app.listen(3000)
app.use(bodyParser.json())
app.use(cookieParser())


// Routes
app.use('/api', router);

initRoutes(router)
