const express = require('express');
const router = express.Router();
const userController = require('../controllers/user_controller');
const passport = require('passport');
const { use } = require('./api');
router.post('/', passport.authenticate(
    'local',
    {failureRedirect: '/'},
), userController.login);
router.get('/', userController.createSession);
module.exports = router;