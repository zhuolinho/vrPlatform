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

const visitCol = mongo.then(function (db) {
    return db.collection('visit');
});

router.get('/visit', function (req, res, next) {
    const dd = new Date();
    visitCol.then(function (col) {
        return col.findOneAndUpdate({time: new Date(`${dd.getFullYear()}/${dd.getMonth() + 1}/${dd.getDate() - 1}`)}, {$inc: {count: 1}}, {upsert: true});
    }).then(function (item) {
        console.log(item);
        formatter(res, 0, 'success', item);
    });
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
    const result = {};
    collection.then(function (col) {
        return col.countDocuments();
    }).then(function (arg) {
        result.accountT = arg;
        return visitCol.then(function (col) {
            const dd = new Date();
            return col.findOne({time: new Date(`${dd.getFullYear()}/${dd.getMonth() + 1}/${dd.getDate() - 1}`)}).then(function (arg) {
                result.visitD = arg.count;
                return col.aggregate([{$group: {_id: null, sum: {$sum: '$count'}}}]).toArray();
            }).then(function (arg) {
                if (arg.length) {
                    result.visitT = arg[0].sum;
                }
            });
        });
    }).then(function (arg) {

        formatter(res, 0, 'success', result);
    });

});

module.exports = router;
