const debug = require('debug')


module.exports = (namespace) => ({
    error: debug(`golfbot:error:${namespace}`),
    app: debug(`golfbot:app:${namespace}`)
})