const express = require('express');
const { createFeedbackController, getFeedbacksByTrainingController } = require('../Controllers/feedback.controllers');
const validate = require('../middlewares/validate');
const isLoggedIn = require('../middlewares/isLoggedIn');
const feedbackValidationSchema = require('../Validators/feedback.validator');
const feedbackRouter = express.Router();

feedbackRouter.post('/', isLoggedIn, validate(feedbackValidationSchema), createFeedbackController);
feedbackRouter.get('/training/:trainingId', getFeedbacksByTrainingController);

module.exports = feedbackRouter;