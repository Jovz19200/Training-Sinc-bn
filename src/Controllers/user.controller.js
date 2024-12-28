
const {fetchAllUsersService, getSingleUser, createUserService, findAUserByEmailService, getUserTrainings, assignTrainingToUser} = require('../Services/user.services');
const {generateAccessToken}  = require('../Utils/jsonwebtoken');
const comparePassword = require('../Utils/comparePassword');
require('../Authentication/auth')



const registerUserController =  async(req, res) =>{
    try {
    
    const {name, email, password} = req.body;
 
    const user = await createUserService(name, email, password);

    if (user){
       return res.status(201).json({
            message: "User created successfully",
            user: user
        })
    }
    else{
       return res.status(409).json({
            message: "User already exist"
        })
    }
  
    }
    catch(error){
        return res.status(500).json({
            message: "Internal Server Error",
            error: error.message
        })
    }
}

const fetchAllUsersController = async(req, res) =>{
    try{
        const users = await fetchAllUsersService();

        if (!users){
            res.status(500).json({
                message: error.message
            })
        }

        res.status(200).json({
            message: "All users fetched successfully",
            length: users.length,
            users: users
        })
    }
    catch(err){
        console.error("Error fetching users", err);
    }
}

const loginAUserController = async(req, res) =>{
    try{
        const {email, password} = req.body;


        const user = await findAUserByEmailService(email)

        if (!user || user == null){
            res.status(404).json({
                message: "Invalid credentials"
            })
            
        }
        else{
            let accessToken = await generateAccessToken(user);
            let match = await comparePassword(password, user.password)
            if (!match){
                res.status(401).json({
                    status: 401,
                    message: "Invalid Credentials"
                })
            }
            else{
                const userInfo = {
                    name: user.name,
                    email: user.email,
                    token: accessToken

                }
                res.status(200).json({
                    status: 200,
                    message: "User Logged In successfully",
                    data: userInfo
                })
            }
        }

    }
    catch(err){
        console.error("Error Logging you in", err);
    }
}


const fetchLoggedInUser = async(req, res) =>{
    try{
        const user = req.user;

        const userData = {
            // id: user.id,
            name: user.name,
            email: user.email,
        }
        if (user) {
            res.status(200).json({
                status: 200,
                message: "user retrieved successfully",
                data: userData,
            })
        }

    }
    catch(err){
        console.error("Error retrieving the user" , err)
    }
    
}

const handleSuccess = async (req, res) =>{
    let user =  req.user
    try{
        // console.log(user);

    }
    catch(err){
        res.status(500).json({
            message: err.message
        })
    }
}

const handleFailure = async(req, res) =>{
    try {
        res.status(401).json({
            message: "unauthorized"
        })
    }
    catch(err){
        res.status(500).json({
            message: err.message
        })
    }
}

const getUserTrainingsController = async(req, res) =>{
    try{
        const userId = req.params.id;
        const user = await getUserTrainings(userId);

        if (!user){
            res.status(404).json({
                message: "User not found"
            })
        }
        else{
            res.status(200).json({
                message: "User trainings fetched successfully",
                length: user.length,
                data: user
            })
        }
    }
    catch(err){
        console.error("Error fetching user trainings", err);
    }
}

const assignTrainingToUserController = async(req, res) =>{
    try{
        const userId = req.params.userId;
        const trainingId = req.params.trainingId;

        const user = await assignTrainingToUser(userId, trainingId);

        if (!user){
            res.status(404).json({
                message: "User not found"
            })
        }
        else{
            res.status(200).json({
                message: "Training assigned to user successfully",
                data: user
            })
        }
    }
    catch(err){
        console.error("Error assigning training to user", err);
    }
}

const getSingleUserController = async(req, res) =>{
    try{
        const userId = req.params.id;
        const user = await getSingleUser(userId);

        if (!user){
            res.status(404).json({
                message: "User not found"
            })
        }
        else{
            res.status(200).json({
                message: "User fetched successfully",
                data: user
            })
        }
    }
    catch(err){
        console.error("Error fetching user", err);
    }
}


module.exports = {
    registerUserController,
    fetchAllUsersController,
    loginAUserController,
    fetchLoggedInUser,
    handleSuccess,
    handleFailure,
    getUserTrainingsController,
    assignTrainingToUserController,
    getSingleUserController

}