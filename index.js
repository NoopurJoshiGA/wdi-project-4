const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const errorHandler = require('./lib/errorHandler');
const app = express();
const mongoose = require('mongoose');
const { dbURI, port } = require('./config/environment');
mongoose.Promise = require('bluebird');
mongoose.connect(dbURI);

const Router = require('./config/routes');

app.use(bodyParser.json());
app.use(morgan('dev')); // morgan logs requests


app.use(express.static(`${__dirname}/public`));

app.use('/api', Router);

app.get('/*', (req, res) => res.sendFile(`${__dirname}/public/index.html`));
// errorHandler must go after Router
app.use(errorHandler);

app.listen(port, () => console.log(`Express is listening on port ${port}`));
