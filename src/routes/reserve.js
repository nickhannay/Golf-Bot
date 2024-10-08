const express = require('express')
const router = express.Router() 
const debug = require('../config/debug-config')('reserve-route')
const GOLF_BOT = require('../shared/golf-bot.js')
const utils = require('../shared/utils.js')
const putReservation = require('../database.js')


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

    debug.msg(`adding reservation for: ${golferId} on ${teeDate} to DB`)
    const result = await putReservation(reserveObject)
    if(result.$metadata.httpStatusCode == 200){
        debug.msg("successfully added:\n\t%O\nto DB", reserveObject)
        res.json({redirect: '/dashboard', reserve_status: {state: 'success', msg: "success"}})
    }
    else {
        debug.error(`Error Adding to DB\n\tmsg: ${result.message}`)
        if (result.name === "ConditionalCheckFailedException"){
            res.json({redirect: '/dashboard', reserve_status: {state: 'failure', msg: "duplicate"}})
        }
        else{
            res.json({redirect: '/dashboard', reserve_status: {state: 'failure', msg: "unknown"}})
        }
    }

})


router.get('/', async (req, res) => {
    let teeSheetId = req.query.teeSheetId
    const numPlayers = req.query.numPlayers
    

    const timeSlices = req.query.teeTime.split(' ')
    const teeTime = `${timeSlices[0]} ${timeSlices[1].toUpperCase()}`
    const teeDate = utils.convertTeeDate(req.query.teeDate) 
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


module.exports = router