const {fetchAllUsersController, registerUserController, loginAUserController, fetchLoggedInUser, handleSuccess, handleFailure} = require('../Controllers/user.controller')
const {Router} = require('express');
const isLoggedIn = require('../middlewares/isLoggedIn');
const {authenticateUser, callBackFn} = require('../Services/user.services')


const userRoutes = Router(); 


userRoutes.get('/', fetchAllUsersController);
userRoutes.post('/register', registerUserController);
userRoutes.post('/login', loginAUserController);
userRoutes.get('/me', isLoggedIn, fetchLoggedInUser);
userRoutes.get('/auth/google', authenticateUser);
userRoutes.get('/auth/google/callback', callBackFn);
userRoutes.get('/auth/google/success', handleSuccess);
userRoutes.get('/auth/google/failure',handleFailure);

module.exports = userRoutes;