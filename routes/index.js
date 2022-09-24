const express = require('express');
const router = express.Router();
const passport = require('passport');
const passportLocal = require('passport-local').Strategy;
const LocalStrategy = require('../configs/passport-local-strategy');
const userController = require('../controllers/user_controller');

router.use('/api', require('./api/index'))
router.get('/', userController.login);
router.get('/logout', passport.checkAuthentication, userController.logout);
router.post('/email-verify',userController.emailVerify);
router.use('/login', require('./login'));
router.use('/verify', require('./users'));
router.use('/home',passport.checkAuthentication, require('./home'));
router.use('/employee', passport.checkAuthentication, require('./employee'));
router.use('/review',passport.checkAuthentication, require('./review'));

module.exports = router;