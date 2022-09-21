const express = require('express');
const router = express.Router();
const passport = require('../../../configs/passport-jwt-strategy');
const passportJwtStrategy = require('passport-jwt').Strategy;
const employeeController = require('../../../controllers/api/v1/employee_controller');

router.post('/create', employeeController.addNewEmployee);
router.get('/getall',passport.authenticate('jwt',{session: false}), employeeController.getEmployees);
router.post('/update/:id', passport.authenticate('jwt',{session: false}), employeeController.updateEmployee);
router.post('/makeadmin/:id', passport.authenticate('jwt',{session: false}), employeeController.makeAdmin);
router.post('/removeadmin/:id', passport.authenticate('jwt',{session: false}), employeeController.removeAdmin);
router.delete('/:id', passport.authenticate('jwt',{session: false}), employeeController.removeEmployee);
router.get('/myprofile/:id', passport.authenticate('jwt',{session: false}), employeeController.myprofile);
router.get('/get-session', require('../../../controllers/api/v1/session-token').createSession);
module.exports = router;