const Redis = require('redis')

const redisClient = Redis.createClient({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
})

redisClient.connect().then(() => {
    console.log("Redis Connected!")
})

module.exports = { redisClient }