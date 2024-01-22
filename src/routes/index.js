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
    const gBot = new GOLF_BOT(email, password)

    const token = await gBot.getToken();


    

    /*if(token === null){
        res.render('index', {error: 'Invalid login credentials'})
    }
    else{
        res.redirect('dashboard')
    }*/

    res.redirect('dashboard')

    
});

module.exports = router;
