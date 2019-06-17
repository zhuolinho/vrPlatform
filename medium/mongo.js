'use strict';
const MongoClient = require('mongodb').MongoClient;
const url = process.env.NODE_ENV ? 'mongodb://localhost:27017' : 'mongodb://47.100.189.103:27017';
const dbName = 'test';
module.exports = MongoClient.connect(url, {useNewUrlParser: true}).then(function (client) {
    return client.db(dbName);
});
