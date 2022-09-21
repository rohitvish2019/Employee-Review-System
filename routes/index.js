const express = require('express');
const router = express.Router();
const passport = require('passport');
const passportLocal = require('passport-local').Strategy;
const LocalStrategy = require('../configs/passport-local-strategy');
router.use('/api', require('./api/index'))
router.use('/', require('./home'));

module.exports = router;