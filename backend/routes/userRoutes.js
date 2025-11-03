const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('This is user account routing.');
 });

 module.exports = router;