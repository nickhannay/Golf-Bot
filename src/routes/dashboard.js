const debug = require('debug')('golf-bot:server');
const express = require('express');
const router = express.Router();

const TOKEN_URL = 'https://golfburnaby.cps.golf/identityapi/connect/token'


router.post('/', async (req, res, next) => {
    const email = req.body['email'];
    const password = req.body['password'];


    const response = await fetch(TOKEN_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Bearer null',
        },
        body: `grant_type=password&scope=openid%20profile%20onlinereservation%20sale%20inventory%20sh%20customer%20email%20recommend%20references&username=${email}&password=${password}&client_id=js1&client_secret=v4secret`
    })

    const token = await response.json()

    debug(token)
    debug(`Received login request for (${email})`)



    res.send("received")
});

module.exports = router;
