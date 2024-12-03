const env = require('./env')
const {sign, verify} = require('jsonwebtoken')

const generateAccessToken = async(user) =>{
    const accessToken = sign(
        {
            id: user.id,
            email: user.email,
            name: user.name
        },
        `${env.jwt_secret}`,
        {
            expiresIn: "72h"
        }
    )
    return accessToken;
}

const decodeToken = async(token) =>{
    const decoded = await verify(token, `${env.jwt_secret}`);
    return decoded;
} 


module.exports = {
    decodeToken,
    generateAccessToken
}