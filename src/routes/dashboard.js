const debug = require('debug')('golf-bot:server');
const express = require('express');
const router = express.Router();
const GOLF_BOT = require('../golf-bot');


router.post('/', async (req, res, next) => {
    const email = req.body['email'];
    const password = req.body['password'];
    const gBot = new GOLF_BOT(email, password);

    const token = await gBot.getToken();

    debug(token)
    debug(`Received login request for (${email})`)



    res.send(`received token: ${token}`)
});


module.exports = router;
