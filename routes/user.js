'use strict';
const express = require('express');
const router = express.Router();
const verify = require('../medium/verify');
const formatter = require('../medium/formatter');
const mongo = require('../medium/mongo');
const userInfo = require('../medium/userInfo');
const common = require('./common');
const ObjectID = require('mongodb').ObjectID;

const collection = mongo.then(function (db) {
    return db.collection('user');
});

router.get('/visit', function (req, res, next) {
    formatter(res, 0, 'success', true);
});

router.post('/register', function (req, res, next) {
    const username = req.body.username, password = req.body.password;
    if (verify.checkParameter(res, username, password)) {
        if (!verify.isValidUsername(username)) {
            formatter(res, 0, 'invalid username')
        } else if (!verify.isValidPassword(password)) {
            formatter(res, 0, 'password is too short');
        } else {
            collection.then(function (col) {
                return col.findOne({username});
            }).then(function (item) {
                if (item) {
                    formatter(res, 0, 'already registered');
                } else {
                    collection.then(function (col) {
                        return col.insertOne({
                            password,
                            username,
                            role: "user"
                        });
                    }).then(function (result) {
                        req.session = {userId: result.insertedId};
                        formatter(res, 0, 'success', userInfo(result.ops[0]));
                    });
                }
            });
        }
    }
});

router.post('/login', function (req, res, next) {
    const username = req.body.username, password = req.body.password;
    if (verify.checkParameter(res, username, password)) {
        collection.then(function (col) {
            return col.findOne({username});
        }).then(function (item) {
            if (item && password === item.password) {
                req.session = {userId: item._id};
                formatter(res, 0, 'success', userInfo(item));
            } else {
                formatter(res, 0, 'login failed');
            }
        });
    }
});

router.use('/*', common);

router.get('/current', function (req, res, next) {
    const userId = req.body.userId;
    collection.then(function (col) {
        return col.findOne({_id: ObjectID(userId ? userId : req.session.userId)});
    }).then(function (item) {
        if (item) {
            if (item._id == req.session.userId) {
                formatter(res, 0, 'success', userInfo(item));
            }
        } else {
            formatter(res, 0, 'abnormal account');
        }
    });
});

router.get('/data', function (req, res, next) {
    collection.then(function (col) {
        return col.countDocuments();
    }).then(function (...args) {
        formatter(res, 0, 'success', {visitData: args});
    });

});

module.exports = router;
