const { findAUserByEmailService } = require('../Services/user.services');
const {decodeToken} = require('../Utils/jsonwebtoken');
const redisClient = require('../config/redis')


const isLoggedIn = async(req, res, next) =>{
    let token;
    try{
        if(
            req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer "))
        {
            token = req.headers.authorization.split(" ")[1];
        }
        if(!token){
            res.status(401).json({
                status: 401,
                message: "UnAuthorized"
            })
        }
        else{
            // const result = await redisClient.lrange('token', 0, 99999999)
            const decoded = await decodeToken(token);
            const loggedUser = await findAUserByEmailService(decoded.email)
            if (!loggedUser){
                res.status(401).json({
                    status: "Unauthorized",
                    message: "Session expired Please login to continue"
                })
            }
            req.user = loggedUser;
            next();
            
        }
    }
    catch(err){
        console.error("Internal server error", err);
    }
}

module.exports = isLoggedIn;