const { Router } = require('express');
const reviewController = require('../controllers/review.controller');
const app = Router();

app.post('/review/create',  reviewController.createReview);

app.get('/review/get-by-user', reviewController.getReviewsByUser);

module.exports = app;
