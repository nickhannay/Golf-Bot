const express = require('express')
const router = express.Router() 
const debug = require('debug')('golf-bot:reserve-route')
const GOLF_BOT = require('../shared/golf-bot.js')
const utils = require('../shared/utils.js')
const {putReservation} = require('../database.js')


router.post('/', async (req, res) => {



    const reserveObject = {
        email: req.session.email.toString() ,
        teeDate: req.body.teeDate.toString(),
        pass: req.session.pass.toString(),
        teeSheetId: req.body.teeSheetId.toString(),
        golferId: req.session.golferId.toString(),
        acctNum: req.session.account.toString(),
        numGolfers: req.session.numGolfers.toString()
    }


    const result = await putReservation(reserveObject)

    if(!result.res){
        debug(`failed to add: \n%O\n to DB\n ${result.data}`, reserveObject)
    }
    else{
        debug(`successfully added : \n%O\n to DB\n`, reserveObject)
    }


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

    let subTotal = priceSummary.shItemPricesGroup[0].extendedPrice
    let totalTax = priceSummary.shItemPricesGroup[0].taxAmount
    let grandTotal = subTotal + totalTax

    subTotal = utils.formatPrice(subTotal)
    totalTax = utils.formatPrice(totalTax)
    grandTotal = utils.formatPrice(grandTotal)
    const itemPrice = utils.formatPrice(priceSummary.shItemPricesGroup[0].price)
    

    const template_params = {
        teeSheetId : teeSheetId, 
        fullName: req.session.fullName, 
        numPlayers: numPlayers,
        teeTime: teeTime,
        teeDate: teeDate,
        subTotal: subTotal,
        totalTax: totalTax,
        itemPrice: itemPrice,
        priceDesc: priceSummary.shItemPricesGroup[0].itemDesc,
        grandTotal : grandTotal
    }
    res.render('reserve', template_params)
})




function dateToStore(date){
    
}

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