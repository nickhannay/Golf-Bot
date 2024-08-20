const debug = require('debug')


module.exports = (namespace) => ({
    error: console.error,
    msg: debug(`golfbot:${namespace}`)
})