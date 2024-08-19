const redis = require('redis')
const RedisStore = require('connect-redis').default
const debug = require('./debug-config')('redis')
const port = 14330
const host = 'redis-14330.c60.us-west-1-2.ec2.redns.redis-cloud.com'



function configureRedis(){
    
    debug.app("env vars:\n %s", process.env)
    const redisClient = redis.createClient({
        password: process.env.REDIS_PASS,
        socket: {
            port: port,
            host: host 
        }
    })
    
    redisClient.connect().then(() => {
        debug.app(`connected to redis ${host}:${port}$`)
    
        const redisStore = new RedisStore({
            client: redisClient,
            prefix: "Golf-Bot",
            ttl: 3600
        })
        debug.app('created redis store')
        return redisStore

    }).catch( error => {
        debug.error('error connecting to <%s>:<%s>\n%s', host, port, error)
        process.exit(1)
    })
    
}

const RedisConfig = configureRedis()

module.exports = RedisConfig