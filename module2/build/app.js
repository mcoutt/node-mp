"use strict";

var express = require('express');

var bodyParser = require('body-parser');

var cookieParser = require('cookie-parser');

var initRoutes = require('./routes/index');

var app = express();
var router = express.Router();
app.listen(3000);
app.use(bodyParser.json());
app.use(cookieParser()); // Routes

app.use('/api', router);
initRoutes(router);
