const express = require('express')
const router = express.Router() 
const debug = require('debug')('golf-bot:server')


router.post('/', (req, res) => {
    const params = {
        teeSheetId : req.body.teeSheetId,
        numPlayers : req.body.numPlayers
    }

    res.json({redirect : '/reserve?' + new URLSearchParams(params)})
})

router.get('/', (req, res) => {
    debug(req.query.teeSheetId)
    debug(`num players: ${req.query.numPlayers}`)

    const template_params = {
        teeSheetId : req.query.teeSheetId, 
        fullName: req.cookies.fullName, 
        numPlayers: req.query.numPlayers
    }
    res.render('reserve', template_params)
})


module.exports = router