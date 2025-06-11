const express = require('express');
const app = express();

const items = require('./routes/item');

app.use('/api/v1', items);

module.exports = app