const { get } = require('../models/training.model');
const {getAllTrainingsService, getUsersAssignedToTrainingService,createTrainingService} = require('../Services/training.services');
const express = require('express')

const createTrainingController = async (req, res) => {
    try{    
        const {title, category, description, status, start_date, duration, training_type} = req.body;

        const data = {
            title,
            category,
            description,
            status,
            start_date,
            duration,
            training_type
        }

        const training = await createTrainingService(data);

        if(!training){
            res.status(409).json({
                message: "Training already exist",
            })
        }
        else{
            res.status(201).json({
                message: "Training created successfully",
                training});
            }
    }
    catch(err){
        res.status(500).json({
            message: "Error creating the training"
        })
    } 
}

const retrieveAllTrainingsController = async (req, res) => {

    const trainings = await getAllTrainingsService();
    if(!trainings || trainings.length === 0){
        res.status(404).json({
            message: "No trainings found",
            data: []
        })
    }
    else{
        res.status(200).json({
            message: "Trainings retrieved successfully",
            length: trainings.length,
            trainings: trainings
        })
    }
}


const getUsersAssignedToTrainingController = async (req, res) => {
    const trainingId = req.params.id;
    const users = await getUsersAssignedToTrainingService(trainingId);

    if(!users || users.length === 0){
        res.status(404).json({
            message: "No users found",
            data: []
        })
    }
    else{
        res.status(200).json({
            message: "Users retrieved successfully",
            length: users.length,
            users: users
        })
    }
}


module.exports  = {
    createTrainingController,
    retrieveAllTrainingsController,
    getUsersAssignedToTrainingController
}