const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const errorHandler = require('./lib/errorHandler');
const app = express();
const mongoose = require('mongoose');
const { dbURI } = require('./config/environment');
mongoose.Promise = require('bluebird');
mongoose.connect(dbURI);

const Router = require('./config/routes');

app.use(bodyParser.json());
app.use(morgan('dev')); // morgan logs requests

app.use('/api', Router);

// errorHandler must go after Router
app.use(errorHandler);

app.listen(4000, () => console.log('Express is listening on port 4000'));
