'use strict';
const formatter = require('./formatter');
module.exports = {
    isEmail: function isEmail(str) {
        const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,})$/;
        return reg.test(str);
    },
    isValidUsername: function isValidUsername(str) {
        const reg = /^[a-zA-Z]+[a-zA-Z0-9_]*$/;
        return reg.test(str);
    },
    isValidPassword: function isValidPassword(str) {
        return str.length > 5;
    },
    checkParameter: function () {
        for (let i = 0; i < arguments.length; i++) {
            if (arguments[i] === undefined) {
                formatter(arguments[0], 2, 'parameter missing');
                return false;
            }
        }
        return true;
    }
};
