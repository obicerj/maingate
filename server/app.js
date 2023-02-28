const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const passport = require('passport');
const bodyParser = require('body-parser');

require('dotenv').config();
require('./middlewares/passport');

require('./models/user');
require('./models/role');
// disabled
// require('./models/userRole');

require('./migrations/seeder');

const middlewares = require('./middlewares/errorHandler');
const api = require('./routes');

const app = express();

var corsOptions = {
  origin: process.env.URL
};

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

app.use('/api/v1', api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;