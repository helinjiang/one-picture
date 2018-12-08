'use strict';

const osenv = require('osenv');


function getUserRtx() {
    return osenv.user().replace('TENCENT\\', '');
}

module.exports = {
    getUserRtx
};
