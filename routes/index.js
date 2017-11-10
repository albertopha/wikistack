const wikiRouter = require('./wiki');
const userRouter = require('./user');
var express = require('express');
var router = express.Router();

module.exports = router;

router.use('/wiki', wikiRouter);

