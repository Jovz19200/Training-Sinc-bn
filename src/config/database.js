const mongoose = require('mongoose');

const env = require('../Utils/env')
const db_connection = env.DB_CONNECTION

const  connectDb = async() =>{
try{
    mongoose.connect(db_connection, {});
    console.log("Database is connected")
}
catch(err) {
    console.error("Error connecting to the database", err);
}
   
}

module.exports = connectDB;