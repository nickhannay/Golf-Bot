const redis = require('redis')
const RedisStore = require('connect-redis').default
const debug = require('debug')('golf-bot:redis-config')


function configureRedis(){
    const host = process.env.REDIS_HOST

    const redisClient = redis.createClient({
        password: process.env.REDIS_PASS,
        socket: {
            port:  11358,
            host: host 
        }
    })
    
    redisClient.connect().catch(console.error)
    debug(`connected to: ${host}`)
    
    const redisStore = new RedisStore({
        client: redisClient,
        prefix: "Golf-Bot",
        ttl: 3600
    })

    debug('created redis store')

    return redisStore
}

const RedisConfig = configureRedis()



module.exports = RedisConfig