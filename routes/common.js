'use strict';
const express = require('express');
const router = express.Router();
const formatter = require('../medium/formatter');

router.use(function (req, res, next) {
    if (req.session.userId) next();
    else formatter(res, 1, 'unauthorized');
});

module.exports = router;
