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

    let token = null
    if(!req.session.hasOwnProperty('token') ){
        console.log("DSFSf")
        token = await GOLF_BOT.getToken(email, password)
        req.session.token = token
    }
    

    const json = await GOLF_BOT.getUserInfo(token)

    res.cookie('fullName', `${json.first_name} ${json.last_name}`)
    res.redirect('dashboard')



    /*if(token === null){
        res.render('index', {error: 'Invalid login credentials'})
    }
    else{
        
    }*/

    
});

module.exports = router;
