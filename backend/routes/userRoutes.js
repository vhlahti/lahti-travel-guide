const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send("This is user account routing.");
 });

const {
	registerUser,
    loginUser,
    logoutUser,
    userProfile,
    addFavorite,
    getFavorites,
} = require('../controllers/userController');

const authMiddleware = require('../middleware/authMiddleware');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.get('/profile', authMiddleware, userProfile);

router.get('/favorites', authMiddleware, getFavorites);
router.post('/favorites/:id', authMiddleware, addFavorite);

module.exports = router;