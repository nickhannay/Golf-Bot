const {DynamoDBClient, PutItemCommand} = require('@aws-sdk/client-dynamodb')
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
        

    }


}




module.exports = Database