const express = require('express');

const router = express.Router();

const {addressChart, salesChart, itemsChart} = require('../controllers/dashboard')

router.get('/address-chart', addressChart)
router.get('/sales-chart', salesChart)
router.get('/items-chart', itemsChart)

module.exports = router;




