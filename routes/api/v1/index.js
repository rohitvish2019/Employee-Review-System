const express = require('express');
const router = express.Router();
router.use('/employee', require('./employee'));
router.use('/review', require('./reviews'));


module.exports = router;