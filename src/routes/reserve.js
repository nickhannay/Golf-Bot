const express = require('express')
const router = express.Router() 
const debug = require('debug')('golf-bot:server')


router.post('/', (req, res) => {
    debug(req.body)
    const teeId = req.body.id
    debug(`inside backend route, tee id = ${teeId}`)

    
    res.json({redirect : '/reserve?' + new URLSearchParams({id : teeId})})
})

router.get('/', (req, res) => {
    const teeId = req.query.id
    debug(`inside redirect ${teeId}`)

    res.render('reserve', {teeSheetId : teeId})
})
module.exports = router