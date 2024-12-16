const express = require('express');
const app = express();
const { setup, serve} = require('swagger-ui-express');
const{ home } = require('./home')
const {loginSchema,userSchema, getUsers, createUser, userLogin, getLoggedInUser } = require('./users')


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
        {name: "Users", description: "User related Endpoints"}
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

        }
    },
    
        
    

    components: {
        schemas:{
            User: userSchema,
            Login: loginSchema,
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