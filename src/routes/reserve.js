const express = require('express')
const router = express.Router() 
const debug = require('debug')('golf-bot:server')


router.post('/', (req, res) => {
    res.json({redirect : '/reserve?' + new URLSearchParams({teeSheetId : req.body.teeSheetId})})
})

router.get('/', (req, res) => {
    debug(req.query.teeSheetId)

    
    res.render('reserve', {teeSheetId : req.query.teeSheetId, fullName: req.cookies.fullName})
})


module.exports = router