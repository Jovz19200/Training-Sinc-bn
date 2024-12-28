const mongoose = require('mongoose');

const env = require('../Utils/env');
const { TrainingSchema } = require('./training.model');
const db_connection = env.DB_CONNECTION;

mongoose.connect(db_connection).then((ans) =>{
    console.log("Database is connected")
}).catch((err)=>{
    console.error("Error connecting to the data");
})


const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },
    department:{
        type: String,
        enum:['IT', 'DGPA', 'DG Corporate Services', 'President Office', 'VPPA Office', 'VPFA Office', 'Clerk Office', 'Communication Unit', ],    
        required: true,
        default: 'DGCS' // Default department
    },

    chamber: {
        type: String,
        enum: ['Senate', 'Chamber of Deputies', 'Both'],
        required: true,
        default: 'Both' // Default
    },

    Role: {
        type: String,
        enum: ['HR', 'Supervisor', 'Member'],
        required: true,
        default: 'Member' // Default role
    },
    trainings:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Training'
        }
    ]
})

const Training = mongoose.model('Training', TrainingSchema);
const User = mongoose.model('User', UserSchema);

module.exports = {
    Training,
    User
};