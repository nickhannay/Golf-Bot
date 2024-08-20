const redis = require('redis')
const RedisStore = require('connect-redis').default
const debug = require('./debug-config')('redis')



function configureRedis(){
    
    const port = process.env.REDIS_PORT
    const host = process.env.REDIS_HOST
    const redisClient = redis.createClient({
        password: process.env.REDIS_PASS,
        socket: {
            port: port,
            host: host 
        }
    })
    
    redisClient.connect().then(() => {
        debug.msg(`connected to redis ${host}:${port}$`)
    
        const redisStore = new RedisStore({
            client: redisClient,
            prefix: "Golf-Bot",
            ttl: 3600
        })
        debug.msg('successfully built redis session store')
        return redisStore

    }).catch( error => {
        debug.error('error connecting to <%s>:<%s>\n%s', host, port, error)
        process.exit(1)
    })
    
}

const RedisConfig = configureRedis

module.exports = RedisConfig()