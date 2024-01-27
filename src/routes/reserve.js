const express = require('express')
const router = express.Router() 
const debug = require('debug')('golf-bot:server')
const GOLF_BOT = require('../golf-bot.js')
const {DynamoDBClient, PutItemCommand} = require('@aws-sdk/client-dynamodb')


router.post('/', (req, res) => {

    const reserveObject = {
        email: req.session.email ,
        pass: req.session.pass,
        teeSheetId: req.body.teeSheetId,
        golferId: req.session.golferId,
        acctNum: req.session.account,
        numGolfers: req.session.numGolfers
    }

    debug(`storing <\n ${JSON.stringify(reserveObject)}\n>`)

    const client  = new DynamoDBClient()

    const params = {
        TableName: 'GolfBot-Reservations',
        Item : {
            golferId : { 'S': reserveObject.golferId.toString()},
            reserveDate: {'S' : 'Date PlaceHolder'}
        }
    }

    const command = new PutItemCommand(params)

    client.send(command)
    .then( data => {
        debug(`Successfully added reservation to DB ${JSON.stringify(data)}`)
    }).catch( err =>{
        debug(`Error adding to DB :\n${err}`)
    })


    res.json({redirect: '/dashboard'})
})

router.get('/', async (req, res) => {
    let teeSheetId = req.query.teeSheetId
    const numPlayers = req.query.numPlayers

    const timeSlices = req.query.teeTime.split(' ')
    const teeTime = `${timeSlices[0]} ${timeSlices[1].toUpperCase()}`
    const teeDate = convertTeeDate(req.query.teeDate) 
    const golferId = req.session.golferId
    const acctNum = req.session.account
    const token = req.session.token

    teeSheetId = parseInt(teeSheetId, 10)
    const priceSummary = await GOLF_BOT.calculatePrice(teeSheetId, token, golferId, acctNum, numPlayers)

    

    const template_params = {
        teeSheetId : teeSheetId, 
        fullName: req.session.fullName, 
        numPlayers: numPlayers,
        teeTime: teeTime,
        teeDate: teeDate,
        subTotal: priceSummary.shItemPricesGroup[0].extendedPrice,
        totalTax: priceSummary.shItemPricesGroup[0].taxAmount,
        itemPrice: priceSummary.shItemPricesGroup[0].price,
        priceDesc: priceSummary.shItemPricesGroup[0].itemDesc
    }
    res.render('reserve', template_params)
})


function convertTeeDate(date){

    const months = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'
    ];

    const dateSlices = date.split('-')
    const year = dateSlices[0]
    const month = months[dateSlices[1] - 1 ]
    const day = dateSlices[2]

    return `${month} ${day}, ${year}`

}


module.exports = router