'use strict';
const express = require('express');
const router = express.Router();
const mongo = require('../medium/mongo');
const collection = mongo.then(function (db) {
    return db.collection('user');
});

router.get('/register', function (req, res, next) {
    res.send(collection);
});

module.exports = router;
