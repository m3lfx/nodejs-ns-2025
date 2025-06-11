const express = require('express');
const app = express();

const items = require('./routes/item');

app.use('/api/v1', items);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
module.exports = app