const debug = require('debug')('golf-bot:server');
const express = require('express');
const router = express.Router();


router.post('/', async (req, res, next) => {
    const email = req.body['email'];
    const pass = req.body['password'];


    debug(`Received login request for (${email})`)

    
    res.send("received")
});

module.exports = router;
