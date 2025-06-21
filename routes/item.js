const express = require('express');
const router = express.Router();
const upload = require('../utils/multer')


const { getAllItems,
    getSingleItem,
    createItem,
    updateItem,
    deleteItem
} = require('../controllers/item')

const {isAuthenticatedUser} = require('../middlewares/auth')

router.get('/items', isAuthenticatedUser, getAllItems)
router.get('/items/:id', getSingleItem)
router.post('/items', upload.single('image'), createItem)
router.put('/items/:id', upload.single('image'), updateItem)
router.delete('/items/:id', deleteItem)
module.exports = router;
