const {Request, Response} = require('express');
const {User, Training} = require('../models/user.model');
const hashedPassword = require('../Utils/hashPassword')
const passport = require('passport')
require('../Authentication/auth');


const createUserService = async(name, email, password) => {
    try{
     
        const existingUser = await User.findOne({email})
        
        if(existingUser){
            return null;
        }
        else{
        
        const hash =  await hashedPassword(password);
        const userData = {
            name,
            email,
            password: hash
        }

        const user = await User.create(userData);

        return user;
        }
        
    }
    catch(error){
        console.error("Error registering user", error )
    }
}

const fetchAllUsersService = async() =>{
    try{
        const users = await User.find({}).select('name email department chamber role trainings').populate('trainings');;
        return users;
    }
    catch(error){
        console.error("Error fetching users", error);
    }

}


const findAUserByEmailService = async (email) =>{

    try{
        const user = await User.findOne({email});
            if(user){
                return user;
            }
            else {
                return null;
            }
    }
    catch(error){
        console.error("Error Logging in", error)
    }
};

const assignTrainingToUser = async (userId, trainingId) =>
    { 
        try{
    const user = await User.findById(userId);

    const training = await Training.findById(trainingId);

    if (user && training) {
        if (!user.trainings.includes(trainingId)){
            user.trainings.push(trainingId);
            await user.save();
    
            training.users.push(userId);
            await training.save();
    
            return user.trainings;
        }
       else{
        return "Training already assigned to user";
       }
        
    } else {
        throw new Error("User or Training not found");
    }
    }catch(err){
        console.error("Error assigning training to user", err);
    }
}

// Retrieve trainings assigned to a user
const getUserTrainings = async (userId)  =>{
    try{
    const user = await User.findById(userId).populate('trainings');

    return user.trainings;
    
    }catch(err){
        console.error("Error fetching user trainings", err);
    }
}

const getSingleUser = async (userId) => {
    try{
        const user = await User.findById(userId);
        const UserData = {
            name: user.name,
            email: user.email,
            department: user.department,
            chamber: user.chamber,
            role: user.Role
        }
        return UserData;
    }
    catch(err){
        console.error("Error fetching user", err);
    }
}

const authenticateUser = () =>{
    passport.authenticate('google', {
        scope: ['email', 'profile']
    })
}

const callBackFn = () =>{
    passport.authenticate('google', {
        successRedirect: 'auth/callback/success',
        failureRedirect: 'auth/callback/failure'
    })
}



module.exports = {
    createUserService,
    fetchAllUsersService,
    findAUserByEmailService,
    authenticateUser,
    callBackFn,
    getUserTrainings,
    assignTrainingToUser,
    getSingleUser,

}