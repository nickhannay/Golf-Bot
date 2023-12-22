const debug = require('debug')('golf-bot:server');
const express = require('express');
const router = express.Router();


router.post('/', (req, res, next) => {
  debug("received form submission")
  res.send("received")
});

module.exports = router;
