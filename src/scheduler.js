const debug = require('debug')('golf-bot:scheduler')
const node_cron = require('node-cron')
const fs = require('fs')




class Scheduler{
    static initializeScheduler() {
        node_cron.schedule('55 22 * * *', () => {
            debug("Executing scheduled event")
            const now = new Date()
            fs.writeFileSync('test_schedule.txt', now.toString())
        })
    }
}


module.exports = Scheduler

