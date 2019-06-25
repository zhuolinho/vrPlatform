'use strict';
const express = require('express');
const router = express.Router();
const userRouter = require('./user');
const vrRouter = require('./vr');
const commonRouter = require('./common');
const cookieSession = require('cookie-session');

router.use(cookieSession({secret: 'Im fuckerB', maxAge: 3000 * 24 * 60 * 60 * 1000}));

/* GET home page. */
router.use(function timeLog(req, res, next) {
    console.log(new Date(), req.session);
    next();
});

router.use('/vr', vrRouter);
router.use('/user', userRouter);
router.use('/*', commonRouter);

module.exports = router;
