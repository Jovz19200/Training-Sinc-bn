const { get } = require('../models/training.model');
const { Training, User } = require('../models/user.model');

const createTrainingService = async (data) =>{
    try{
        const training = await Training.create(data);
        return training;
    }
    catch(error){
        console.error("Error creating training", error);
    }
}

const getAllTrainingsService = async () => {
    try{   
        const trainings = await Training.find({}).populate('users');

        if (!trainings) {
            throw new Error("No Trainings found");
            return [];
        }
        return trainings;
    }
    catch(error){
        console.error("Error retrieving trainings", error);
    }
}


// retrieve users assigned to a training
const getUsersAssignedToTrainingService = async (trainingId) => {
    try {
        const training = await Training.findById(trainingId).populate('users')
        
        const users = training.users.map(user => ({
            name: user.name,
            email: user.email,
            department: user.department,
            chamber: user.chamber,
            role: user.role,
            trainings: user.trainings
        }));

        return users;
    } catch (error) {
        console.error("Error fetching users assigned to training", error);
    }
}

module.exports = {
    createTrainingService,
    getAllTrainingsService,
    getUsersAssignedToTrainingService
}