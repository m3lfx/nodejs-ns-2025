const express = require('express');
const router = express.Router();

const {getAllItems, } = require('../controllers/item')

router.get('/items', getAllItems)

module.exports = router;