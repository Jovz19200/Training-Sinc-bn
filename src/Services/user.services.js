const {Request, Response} = require('express');
const User = require('../models/user.model');
const hashedPassword = require('../Utils/hashPassword')

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
        const users = await User.find({});
        return users;
    }
    catch(error){
        console.error("Error fetching users", error);
    }

}

const loginAUserService = async (email) =>{
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
}


module.exports = {
    createUserService,
    fetchAllUsersService,
    loginAUserService
}