
const express = require('express');
const router = express.Router();
const GOLF_BOT = require('../golf-bot.js')


router.get('/', async (req, res, next) => {

    const times = await GOLF_BOT.getTeeTimes(new Date())

    console.log(times)






    res.render('dashboard', {teetimes: times})
});


module.exports = router;
