'use strict';
const express = require('express');
const router = express.Router();
const mongo = require('../medium/mongo');
const formatter = require('../medium/formatter');

const collection = mongo.then(function (db) {
    return db.collection('vr');
});

router.use(function (req, res, next) {
    if (req.session.userId) {
        collection.then(function (col) {
            return col.findOneAndUpdate({time: todayDate()}, {$inc: {count: 1}}, {upsert: true});
        }).then(function (item) {
            formatter(res, 0, 'success', {item, path: '/vr'});
        });
    } else formatter(res, 0, 'success', {path: '#/user/login'});
});

function todayDate() {
    const dd = new Date();
    return new Date(`${dd.getFullYear()}/${dd.getMonth() + 1}/${dd.getDate()}`);
}

module.exports = router;
