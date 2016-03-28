/*
 *  NestThermostat.js
 *
 *  David Janes
 *  IOTDB
 *  2015-06-16
 */

"use strict";

var iotdb = require("iotdb");

exports.binding = {
    bridge: require('../NestBridge.js').Bridge,
    model: require('./nest-thermostat.json'),
    matchd: {
        'iot:vendor.model': 'Nest Thermostat',
    },
    metad: {
        'iot:facet': [ 
            'iot-facet:control',
            'iot-facet:control.climate',
            'iot-facet:sensor',
            'iot-facet:sensor.humdity',
            'iot-facet:sensor.temperature',
        ],
    },
};
