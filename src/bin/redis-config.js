const redis = require('redis')
const RedisStore = require('connect-redis').default


function configureRedis(){
    const redisClient = redis.createClient({
        password: 'FLE7YmHfK4pdT5H768VKCr012Sti8ynI',
        socket: {
            port:  11358,
            host: 'redis-11358.c289.us-west-1-2.ec2.cloud.redislabs.com' 
        }
    })
    
    redisClient.connect().catch(console.error)
    
    const redisStore = new RedisStore({
        client: redisClient,
        prefix: "Golf-Bot",
        ttl: 3600
    })

    return redisStore
}

const RedisConfig = configureRedis()



module.exports = RedisConfig