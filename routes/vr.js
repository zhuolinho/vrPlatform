'use strict';
const express = require('express');
var path = require('path');
const router = express.Router();
const mongo = require('../medium/mongo');
const cookieSession = require('cookie-session');

const collection = mongo.then(function (db) {
    return db.collection('vr');
});

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
    collection.then(function (col) {
        return col.findOneAndUpdate({time: todayDate()}, {$inc: {count: 1}}, {upsert: true});
    }).then(function (item) {
        console.log(item);
    });
});

function todayDate() {
    const dd = new Date();
    return new Date(`${dd.getFullYear()}/${dd.getMonth() + 1}/${dd.getDate()}`);
}

module.exports = router;
