const {fetchAllUsersService, createUserService, loginAUserService} = require('../Services/user.services');
const {generateAccessToken}  = require('../Utils/jsonwebtoken');
const comparePassword = require('../Utils/comparePassword');


const registerUserController =  async(req, res) =>{
    try {
        // console.log("Hellooo herea")
    const {name, email, password} = req.body;
 
    const user = await createUserService(name, email, password);

    if (user){
       return res.status(201).json({
            message: "User created successfully",
            user
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

        res.status(200).json({
            message: "All users fetched successfully",
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

        const user = await loginAUserService(email)
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


module.exports = {
    registerUserController,
    fetchAllUsersController,
    loginAUserController
}