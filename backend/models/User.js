const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
   username: {
       type: String,
       required: true,
   },
   password: {
       type: String,
       required: true,
   },
   createdAt: {
       type: Date,
       default: new Date(new Date().getTime()),
   },
});

module.exports = mongoose.model('User', userSchema);