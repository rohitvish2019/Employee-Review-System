const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home_controller');
const passport = require('passport');
router.post('/home', passport.authenticate(
    'local',
    {failureRedirect: '/'},
), homeController.createSession);
router.get('/', homeController.login)
module.exports = router;