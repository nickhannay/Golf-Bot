const {DynamoDBClient, PutItemCommand} = require('@aws-sdk/client-dynamodb')
const debug = require('debug')('golf-bot:DB')


const putReservation = async (reserveObject) => {
    const client  = new DynamoDBClient()

    const params = {
        TableName: 'GolfBot-Reservations',
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

    return client.send(command)
    .then(res => {
        return res
    }).catch(err =>{
        return err
    })
}

module.exports = {putReservation}