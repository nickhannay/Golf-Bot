"use strict";

const express = require('express');
const router = express.Router();
const debug = require('debug')('golf-bot:server');
const GOLF_BOT = require('../golf-bot');


router.get('/', function(req, res, next) {
    res.render('index');
});


router.post('/', async (req, res) => {
    const email = req.body['email'];
    const password = req.body['password'];

    const token = await GOLF_BOT.getToken(email, password)



    if(token === null){
        res.render('index', {error: 'Invalid login credentials'})
    }
    else{
        req.session.token = token
        res.redirect('dashboard')
    }

    
});

module.exports = router;
