const express = require('express');
const router = express.Router();
const upload = require('../utils/multer')


const { getAllItems, getSingleItem, createItem } = require('../controllers/item')

router.get('/items', getAllItems)
router.get('/items/:id', getSingleItem)
router.post('/items', upload.single('image'), createItem)
module.exports = router;
