const express = require('express');
const router = express.Router();
const passport = require('passport');
const passportLocal = require('passport-local').Strategy;
const LocalStrategy = require('../configs/passport-local-strategy');
const employeeController = require('../controllers/employee_controller');

router.get('/getall', passport.checkAuthentication, employeeController.getAll);
router.get('/getMyReviews/:id', passport.checkAuthentication, employeeController.getMyReviews);
router.post('/create', passport.checkAuthentication, employeeController.createNew)
router.delete('/:id',passport.checkAuthentication, employeeController.deleteEmployee);
router.post('/update/:id', passport.checkAuthentication, employeeController.updateEmployee);


module.exports = router;