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

    const timeSlices = req.query.teeTime.split(' ')
    const teeTime = `${timeSlices[0]} ${timeSlices[1].toUpperCase()}`
    const teeDate = convertTeeDate(req.query.teeDate)

    const template_params = {
        teeSheetId : req.query.teeSheetId, 
        fullName: req.cookies.fullName, 
        numPlayers: req.query.numPlayers,
        teeTime: teeTime,
        teeDate: teeDate
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