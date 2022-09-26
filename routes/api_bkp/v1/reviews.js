const express = require('express');
const router = express.Router();
const passport = require('../../../configs/passport-jwt-strategy');
const passportJwtStrategy = require('passport-jwt').Strategy;
const reviewController = require('../../../controllers/api/v1/review_controller');

router.post('/create',passport.authenticate('jwt',{session: false}), reviewController.createReview);
router.get('/getall', passport.authenticate('jwt',{session: false}), reviewController.viewReviews);
router.delete('/:id', passport.authenticate('jwt' , {session: false}), reviewController.deleteReview);
router.post('/update/:id', passport.authenticate('jwt', {session: false}), reviewController.updateReview);

module.exports = router;