'use strict';
module.exports = function (obj) {
    return {
        userId: obj._id,
        username: notNull(obj.username),
        role: obj.role
    };
};

function notNull(str) {
    if (str === null) {
        return '';
    } else {
        return str;
    }
}
