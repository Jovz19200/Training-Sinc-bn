const TrainingSchema = {
    type: "object",
    properties:{
        "title": {
          "type": "string",
          "required": true
        },
        "category": {
          "type": "string",
          "required": true
        },
        "description": {
          "type": "string",
          "required": true
        },
        "status": {
          "type": "string",
          "required": true
        },
        "start_date": {
          "type": "string",
          "required": true
        },
        "training_type": {
          "type": "string",
          "required": true
        }
    }
}

const getAllTrainings = {
    tags: ['Training'],
    summary: "Get all trainings",
    responses: {
        200: {
            description: "Success",
        },
        500: {
            description: "Internal Server Error",
        },
    }
}

const createTraining = {
    tags: ['Training'],
    summary: "register a new training",
    requestBody: {
        required: true,
        content: {
            "application/json": {
                schema: {
                    $ref: "#components/schemas/Training"
                }
            }
        }
    },
    responses:{
        201:{
            description: "Training Created successfully"
        },
        409:{
            description: "Training already exist"
        }
    }
}

module.exports = {
    TrainingSchema,
    getAllTrainings,
    createTraining
}