const redis = require('redis')
const RedisStore = require('connect-redis').default
const debug = require('debug')('golf-bot:redis-config')


function configureRedis(){
    const host = 'redis-11358.c289.us-west-1-2.ec2.cloud.redislabs.com'

    const redisClient = redis.createClient({
        password: 'FLE7YmHfK4pdT5H768VKCr012Sti8ynI',
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