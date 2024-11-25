const Redis = require('ioredis');
const env = require('../Utils/env');

const redisClient = new Redis(env.redis_url)

redisClient.on('connect', ()=>{
    console.log("Redis connected successfully")
});

redisClient.on('end' , ()=>{
    console.log("Redis disconnected successfully")
});

redisClient.on('error', ()=>{
    console.error('Error connecting Redis')
});

module.exports = redisClient;