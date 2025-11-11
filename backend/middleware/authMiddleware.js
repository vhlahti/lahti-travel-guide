const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
  try {
    // Look for Authorization header first
    const authHeader = req.headers.authorization;

    let token;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.split(' ')[1];
    } 
    // Optional: fallback for cookie-based tokens
    else if (req.cookies && req.cookies.jwt) {
      token = req.cookies.jwt;
    }

    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user to request
    req.user = await User.findById(decoded.id).select('-password');
    if (!req.user) {
      return res.status(404).json({ message: 'User not found' });
    }

    next();
  } catch (error) {
    console.error('Auth error:', error.message);
    res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = authMiddleware;