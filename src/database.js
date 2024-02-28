const {DynamoDBClient, PutItemCommand, ScanCommand} = require('@aws-sdk/client-dynamodb')
const { param } = require('./routes')
const debug = require('debug')('golf-bot:DB')





class Database{
    static #db_name = 'GolfBot-Reservations'
    #db_client

    constructor(){
        if(!Database.instance){
            this.#db_client = new DynamoDBClient()
            Database.instance = this
        }
        
        return Database.instance
    }

    async putReservation(reserveObject){
    
        const params = {
            TableName: Database.#db_name,
            Item : {
                'golferId' : { 'S' : reserveObject.golferId},
                'reserveDate' : {'S' : reserveObject.teeDate},
                'acctNum' : {'S' : reserveObject.acctNum},
                'teeSheetId' : {'S' : reserveObject.teeSheetId},
                'numGolfers' : {'S' : reserveObject.numGolfers},
                'email' : {'S' : reserveObject.email},
                'password' : {'S' : reserveObject.pass}
            },
            ConditionExpression: 'attribute_not_exists(golferId) AND attribute_not_exists(reserveDate)'
        }
    
        const command = new PutItemCommand(params)
    
        return this.#db_client.send(command)
                    .then(res => {
                        return res
                    }).catch(err =>{
                        return err
                    })
    }


    async getReservations(){
        const five_days = Date.now() + (5 * 24 * 60 * 60 * 1000)
        let date = new Date(five_days)
        date = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
        debug("Fetching all reservations on: " + date)
        const params = {
            TableName: Database.#db_name,
            ExpressionAttributeValues: {
                ":date" : { S : date}
            },
            FilterExpression: 'reserveDate = :date'
        }
        
        const command = new ScanCommand(params)

        return this.#db_client.send(command)
                    .then(res => {
                        return res
                    })
                    .catch(err => {
                        return err
                    })

    }


}




module.exports = Database