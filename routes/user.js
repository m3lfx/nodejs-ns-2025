const express = require('express');
const router = express.Router();
const upload = require('../utils/multer')

const {registerUser, loginUser, updateUser} = require('../controllers/user')

router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/update-profile', upload.single('image'), updateUser)

module.exports = router;