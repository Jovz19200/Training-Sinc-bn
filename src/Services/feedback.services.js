const Feedback = require('../models/feedback.model');

const createFeedbackService = async (data) => {
    try {

        const trainingExists = await Training.findById(data.training);
        if (!trainingExists) {
            throw new Error("Training not found");
        }

        const feedback = await Feedback.create(data);
        return feedback;
    } catch (error) {
        console.error("Error creating feedback", error);
        throw error;
    }
};

const getFeedbacksByTrainingService = async (trainingId) => {
    try {
        return await Feedback.find({ training: trainingId }).populate('user', 'name email');
    } catch (error) {
        console.error("Error retrieving feedbacks", error);
        throw error;
    }
};

module.exports = {
    createFeedbackService,
    getFeedbacksByTrainingService
};