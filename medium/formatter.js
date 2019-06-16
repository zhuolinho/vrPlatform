'use strict';
module.exports = function (res, error, msg, result) {
    if (!res._headerSent) res.send({errno: error, msg: msg, result: result});
};
