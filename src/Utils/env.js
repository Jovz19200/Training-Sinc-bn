const dotenv = require('dotenv');

dotenv.config();

 const env = {
    PORT:process.env.PORT,
    DB_CONNECTION:process.env.DB_CONNECTION,
    jwt_secret: process.env.JWT_SECRET
};

module.exports = env;
