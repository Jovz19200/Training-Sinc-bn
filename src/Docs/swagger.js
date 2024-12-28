const express = require('express');
const app = express();
const { setup, serve} = require('swagger-ui-express');
const{ home } = require('./home')
const {loginSchema,userSchema, getUsers, createUser, userLogin, getLoggedInUser } = require('./users')
const {TrainingSchema, getAllTrainings, createTraining} = require('./training')
const { createCategory, getAllCategories } = require('./categories')

const  env  = require('../Utils/env');

const DocRouter = express.Router();

const options = {
    openapi: "3.0.1",
    info: {
        title: "TSinca 1.0.0 ",
        version: "1.0.0",
        description: "This is the documentation for the OTMS Backend"

    },
    servers: [
        {
            url: `http://localhost:${env.PORT}`,
        },
    ],

    basepath: "/",

    tags: [
        {name: "Home", description: "Home Page"},
        {name: "Users", description: "User related Endpoints"},
        {name: "Training", description: "Training related Endpoints"},
        {name: "Categories", description: "Category related Endpoints"},
    ],

    paths:
    {
        "/":
            {
                get: home
            },
        "/users":
            {
                get: getUsers
            },
        "/users/register": 
            {
                post: createUser
            },
        "/users/login":
        {
            post: userLogin
        },
        "/users/me":{
            get: getLoggedInUser

        },
        "/trainings":
            {
                get: getAllTrainings
            },
        "/trainings/register":
            {
                post: createTraining
            },
        "/categories":
            {
                get: getAllCategories
            },
        "/categories/create":
            {
                post: createCategory
            },

    },
    
        
    

    components: {
        schemas:{
            User: userSchema,
            Login: loginSchema,
            Training: TrainingSchema,
        },
        securitySchemes: {
            bearerAuth: {
                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT",
                in: "header",
                name: "Authorization",

            },
        },
    },
}

DocRouter.use("/", serve, setup(options));

module.exports ={
    DocRouter
} 