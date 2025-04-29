const { createFeedbackService, getFeedbacksByTrainingService } = require('../Services/feedback.services');

const createFeedbackController = async (req, res) => {
    try {
        const { training, rating, comment } = req.body;
        const user  = req.user.id;
        
        const feedback = await createFeedbackService({ training, user, rating, comment });
        res.status(201).json({
            message: "Feedback submitted successfully",
            feedback
        });
    } catch (err) {
        res.status(500).json({
            message: "Error submitting feedback"
        });
    }
};

const getFeedbacksByTrainingController = async (req, res) => {
    try {
        const trainingId = req.params.trainingId;
        const feedbacks = await getFeedbacksByTrainingService(trainingId);
        res.status(200).json({
            message: "Feedbacks retrieved successfully",
            feedbacks
        });
    } catch (err) {
        res.status(500).json({
            message: "Error retrieving feedbacks"
        });
    }
};

module.exports = {
    createFeedbackController,
    getFeedbacksByTrainingController
};