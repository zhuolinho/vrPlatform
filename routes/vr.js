'use strict';
const express = require('express');
var path = require('path');
const router = express.Router();
const cookieSession = require('cookie-session');

router.use(cookieSession({secret: 'Im fuckerB', maxAge: 3000 * 24 * 60 * 60 * 1000}));

router.use(function timeLog(req, res, next) {
    console.log(new Date(), req.session);
    next();
});

router.use(function (req, res, next) {
    if (req.session.userId) next();
    else res.redirect('/user/login');
});

router.get('/vr1', function (req, res) {
    res.sendFile(path.join(__dirname, '../public/vr/', 'vr1.html'));
});

module.exports = router;
