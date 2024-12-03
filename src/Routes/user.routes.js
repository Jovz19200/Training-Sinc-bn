const {fetchAllUsersController, registerUserController, loginAUserController} = require('../Controllers/user.controller')
const {Router} = require('express');

const userRoutes = Router(); 


userRoutes.get('/', fetchAllUsersController);
userRoutes.post('/register', registerUserController);
userRoutes.post('/login', loginAUserController);


module.exports = userRoutes;