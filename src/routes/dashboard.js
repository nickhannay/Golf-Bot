const express = require('express');
const router = express.Router();
const GOLF_BOT = require('../shared/golf-bot.js')
const debug = require('debug')('golf-bot:dashboard-route')
const utils = require('../shared/utils.js')

// render dashboard
router.get('/', async (req, res, next) => {
    const today = new Date()
    const searchDate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()
    
    const times = await GOLF_BOT.getTeeTimes(searchDate)

    const availableTimes = Array.isArray(times)
    if(availableTimes){
        times.forEach((time) => {
            time.displayTime = utils.convert12hr(time.startTime)
        })
    }
    if(req.query.reserve_state){
        res.render('dashboard', {teetimes: times, availableTimes, reserve_status: {reserve_state: req.query.reserve_state, reserve_msg: req.query.reserve_msg}})
    }
    else{
        res.render('dashboard', {teetimes: times, availableTimes})
    }
    
});


// handle AJAX request from client
router.post('/', (req, res) => {
    req.session.numGolfers = req.body.numPlayers
    const params = {
        teeSheetId : req.body.teeSheetId,
        numPlayers : req.body.numPlayers,
        teeTime: req.body.teeTime,
        teeDate: req.body.teeDate
    }

    res.json({redirect : '/reserve?' + new URLSearchParams(params)})
})




module.exports = router;
