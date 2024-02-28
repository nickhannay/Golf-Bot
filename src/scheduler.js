const debug = require('debug')('golf-bot:scheduler')
const node_cron = require('node-cron')
const fs = require('fs')
const Database = require('./database')



class Scheduler{
    static initializeScheduler() {
        node_cron.schedule('51 15 * * *', async () => {
            debug("Executing scheduled event")
            let db = new Database()
            const res = await db.getReservations()
            debug("%O", res)
        })
    }
}


module.exports = Scheduler

