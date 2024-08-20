const debug = require('debug')('golf-bot:scheduler')
const node_cron = require('node-cron')
const db_connection = require('./database')



class Scheduler{
    static initializeScheduler() {
        node_cron.schedule('10 16 * * *', async () => {
            debug("Executing scheduled event")
            let db = new db_connection()
            const res = await db.getReservations()
            if(res.$metadata.httpStatusCode == 200){
                debug(res.Items)
                res.Items.forEach((item) => {
                    debug(`Reserving teetime on: ${item.reserveDate.S} for ${item.email.S}`)
                })
            }
            else{
                // Handle Error
            }

            
        })
    }
}


module.exports = Scheduler

