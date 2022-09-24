const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/review_controller');
router.post('/create', reviewController.createReview);
router.delete('/:id', reviewController.deleteReview);

module.exports = router;