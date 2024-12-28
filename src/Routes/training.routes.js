const express = require('express');
const { retrieveAllTrainingsController, createTrainingController, getUsersAssignedToTrainingController } = require('../Controllers/training.controllers');

const trainingRouter = express.Router();


trainingRouter.get('/', retrieveAllTrainingsController);
trainingRouter.post('/register', createTrainingController);
trainingRouter.get('/users/:id', getUsersAssignedToTrainingController);


module.exports = trainingRouter;