
const express = require('express');
const router = express.Router();
const GOLF_BOT = require('../golf-bot.js')


router.get('/', async (req, res, next) => {
    const today = new Date()
    const searchDate = today.getFullYear() + '-' + today.getMonth()+1 + '-' + today.getDate()
    const times = await GOLF_BOT.getTeeTimes(searchDate)


    res.render('dashboard', {teetimes: times})
});




module.exports = router;
