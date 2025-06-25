const express = require('express');
const router = express.Router();
const upload = require('../utils/multer')

const {registerUser, loginUser, updateUser, deactivateUser} = require('../controllers/user')
const {isAuthenticatedUser} = require('../middlewares/auth')
router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/update-profile', isAuthenticatedUser, upload.single('image'), updateUser)
router.delete('/deactivate', isAuthenticatedUser, deactivateUser)

module.exports = router;