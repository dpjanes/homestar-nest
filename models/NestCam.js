/*
 *  NestCam.js
 *
 *  David Janes
 *  IOTDB
 *  2015-10-18
 */

"use strict";

var iotdb = require("iotdb");

exports.binding = {
    bridge: require('../NestBridge.js').Bridge,
    model: require('./nest-cam.json'),
    matchd: {
        'iot:vendor.model': 'Nest Cam',
    },
};
