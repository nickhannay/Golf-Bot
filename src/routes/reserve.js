const express = require('express')
const router = express.Router() 
const debug = require('debug')('golf-bot:server')


router.post('/', (req, res) => {
    debug(`Time: ${req.body.teeTime} - Date: ${req.body.teeDate}`)
    const params = {
        teeSheetId : req.body.teeSheetId,
        numPlayers : req.body.numPlayers,
        teeTime: req.body.teeTime,
        teeDate: req.body.teeDate
    }

    res.json({redirect : '/reserve?' + new URLSearchParams(params)})
})

router.get('/', (req, res) => {
    debug(req.query.teeSheetId)
    debug(`num players: ${req.query.numPlayers}`)

    const template_params = {
        teeSheetId : req.query.teeSheetId, 
        fullName: req.cookies.fullName, 
        numPlayers: req.query.numPlayers,
        teeTime: req.query.teeTime,
        teeDate: req.query.teeDate
    }
    res.render('reserve', template_params)
})


module.exports = router