/*
 *  NestProtect.js
 *
 *  David Janes
 *  IOTDB
 *  2015-06-16
 */

"use strict";

var iotdb = require("iotdb");

exports.Model = iotdb.make_model('NestProtect')
    .facet(":security")
    .name("NestProtect")
    .description("Nest Protect")
    .i("co_alarm_state", iotdb.sensor.string.chemical.co2)
    .i("smoke_alarm_state", iotdb.sensor.string.smoke)
    .i("battery_health", iotdb.sensor.string.battery)
    .make();

exports.binding = {
    bridge: require('../NestBridge').Bridge,
    model: exports.Model,
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
