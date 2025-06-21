const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');

const items = require('./routes/item');
const users = require('./routes/user')
const orders = require('./routes/order')

app.use(cors())


// app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/images', express.static(path.join(__dirname, 'images')))

app.use('/api/v1', items);
app.use('/api/v1', users);
app.use('/api/v1', orders);


module.exports = app