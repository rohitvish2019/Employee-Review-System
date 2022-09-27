const express = require('express');
const router = express.Router();
const userController = require('../controllers/user_controller');
const passport = require('passport');
const passportLocal = require('passport-local').Strategy;
const LocalStrategy = require('../configs/passport-local-strategy');
router.post('/', passport.authenticate(
    'local',
    {failureRedirect: '/'},
), userController.createSession);
router.get('/', userController.login);
module.exports = router;