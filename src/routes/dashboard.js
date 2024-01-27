
const express = require('express');
const router = express.Router();
const GOLF_BOT = require('../golf-bot.js')
const debug = require('debug')('golf-bot:server')

// render dashboard
router.get('/', async (req, res, next) => {
    const today = new Date()
    const searchDate = today.getFullYear() + '-' + today.getMonth()+1 + '-' + today.getDate()
    const times = await GOLF_BOT.getTeeTimes(searchDate)

    
    res.render('dashboard', {teetimes: times})
});


// handle AJAX request from client
router.post('/', (req, res) => {
    debug(`Time: ${req.body.teeTime} - Date: ${req.body.teeDate}`)
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
