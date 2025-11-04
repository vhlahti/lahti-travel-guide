const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send("This is user account routing.");
 });

const {
	registerUser,
    loginUser,
    userProfile,
} = require('../controllers/userController');

const authMiddleware = require('../middleware/authMiddleware');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/profile', authMiddleware, userProfile);

module.exports = router;