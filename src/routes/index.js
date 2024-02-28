

const express = require('express');
const router = express.Router();
const debug = require('debug')('golf-bot:index-route');
const GOLF_BOT = require('../shared/golf-bot.js');


router.get('/', function(req, res, next) {
    res.render('index');
});


router.post('/', async (req, res) => {
    const email = req.body['email'];
    const password = req.body['password'];
 
    let token = await GOLF_BOT.getToken(email, password)


    debug(token)
    if(token === null){
        res.render('index', {error: 'Invalid login credentials'})
    }
    else{
        const json = await GOLF_BOT.getUserInfo(token)
        req.session.token = token
        req.session.fullName = `${json.first_name} ${json.last_name}`
        req.session.account = `${json.acct}`
        req.session.golferId = `${json.golferId}`
        req.session.email = `${email}`
        req.session.pass = `${password}`
        res.redirect('dashboard')
    }

    
});

module.exports = router;
