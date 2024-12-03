const mongoose = require('mongoose');

const env = require('../Utils/env');
const db_connection = env.DB_CONNECTION;


mongoose.connect(db_connection).then((ans) =>{
    console.log("Database is connected")
}).catch((err)=>{
    console.error("Error connecting to the database");
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
})

const User = mongoose.model('User', UserSchema);

module.exports = User;