const dotenv = require('dotenv');

dotenv.config();

 const env = {
    PORT:process.env.PORT,
    DB_CONNECTION:process.env.DB_CONNECTION,
    jwt_secret: process.env.JWT_SECRET,
    redis_url: process.env.REDIS_URL,
    client_id: process.env.GOOGLE_CLIENT_ID,
    client_secret: process.env.GOOGLE_CLIENT_SECRET,
    googlecallbackurl: process.env.GOOGLE_CALL_BACK_URL

};

module.exports = env;
