const express = require('express');

const app = express();
const morgan = require('morgan');
const path = require('path');
const tourRouter = require('./routes/tourRouter');

app.use(morgan('dev'));

app.use(express.json());

app.use(express.static(path.join(__dirname, './public')));

app.use('/api/v1/tours', tourRouter);

module.exports = app;
