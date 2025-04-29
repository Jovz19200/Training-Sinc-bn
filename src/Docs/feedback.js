const FeedbackSchema = {
    type: "object",
    properties: {
        training: { type: "string", required: true },
        user: { type: "string", required: true },
        rating: { type: "integer", minimum: 1, maximum: 5, required: true },
        comment: { type: "string" }
    }
};

const createFeedback = {
    tags: ['Feedback'],
    summary: "Submit feedback for a training",
    security: [{bearerAuth: []}],
    requestBody: {
        required: true,
        content: {
            "application/json": {
                schema: { $ref: "#/components/schemas/Feedback" }
            }
        }
    },
    responses: {
        201: { description: "Feedback submitted successfully" },
        500: { description: "Error submitting feedback" }
    }
};

const getFeedbacksByTraining = {
    tags: ['Feedback'],
    summary: "Get all feedbacks for a training",
    parameters: [
        {
            name: "trainingId",
            in: "path",
            required: true,
            schema: { type: "string" }
        }
    ],
    responses: {
        200: { description: "Feedbacks retrieved successfully" },
        500: { description: "Error retrieving feedbacks" }
    }
};

module.exports = {
    FeedbackSchema,
    createFeedback,
    getFeedbacksByTraining
};