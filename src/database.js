const {DynamoDBClient, PutItemCommand} = require('@aws-sdk/client-dynamodb')
const debug = require('debug')('golf-bot:DB')


const putReservation = (reserveObject) => {
    const client  = new DynamoDBClient()

    const params = {
        TableName: 'GolfBot-Reservations',
        Item : {
            'golferId' : { 'S' : reserveObject.golferId},
            'reserveDate' : {'S' : 'DATE'},
            'acctNum' : {'S' : reserveObject.acctNum},
            'teeSheetId' : {'S' : reserveObject.teeSheetId},
            'numGolfers' : {'S' : reserveObject.numGolfers},
            'email' : {'S' : reserveObject.email},
            'password' : {'S' : reserveObject.pass}
        }
    }

    const command = new PutItemCommand(params)

    return client.send(command)
    .then( data => {
        return {res: true, data: data}
    }).catch( err =>{
        return {res : false, data : err}
    })
}

module.exports = {putReservation}