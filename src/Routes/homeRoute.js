const {request, response, Router} = require('express');


const HomeRoute = Router();

HomeRoute.get('/', (request, response) =>{
    try{
        response.status(200).json({
            message: 'Training API is working 😁'
        })
    }
    catch(error){
        response.status(500).json({
            message: "Internal Server Error",
            error: error.message
        })
    }
})


module.exports = {
    HomeRoute
}