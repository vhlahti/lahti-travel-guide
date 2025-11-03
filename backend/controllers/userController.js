const User = require('../models/User');

const registerUser = async (req, res) => {
res.status(201).json({message:'registerUser'});
};

module.exports = {
    registerUser,
};