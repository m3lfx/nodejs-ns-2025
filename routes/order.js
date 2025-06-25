const express = require('express');

const router = express.Router();

const {createOrder} = require('../controllers/order')
const {isAuthenticatedUser} = require('../middlewares/auth')

router.post('/create-order', isAuthenticatedUser, createOrder)

module.exports = router;