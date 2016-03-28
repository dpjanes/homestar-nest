/*
 *  NestProtect.js
 *
 *  David Janes
 *  IOTDB
 *  2015-06-16
 */

"use strict";

var iotdb = require("iotdb");

exports.binding = {
    bridge: require('../NestBridge.js').Bridge,
    model: require('./nest-protect.json'),
    matchd: {
        'iot:vendor.model': 'Nest Protect',
    },
    metad: {
        'iot:facet': [ 
            'iot-facet:alarm',
            'iot-facet:alarm.chemical',
            'iot-facet:alarm.chemical.co2',
            'iot-facet:alarm.chemical.smoke',
        ],
    },
};
