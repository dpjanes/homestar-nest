/*
 *  NestThermostat.js
 *
 *  David Janes
 *  IOTDB
 *  2015-06-16
 */

var iotdb = require("iotdb");

exports.Model = iotdb.make_model('NestThermostat')
    .facet(":hvac.thermostat")
    .name("NestThermostat")
    .description("Nest Thermostat")
    .io("target_temperature_c", ( iotdb.number.temperature.celsius ).name("target temperature"))
    .i("ambient_temperature_c", ( iotdb.sensor.number.temperature.celsius ).name("ambient temperature"))
    .i("humidity", iotdb.sensor.number.humidity.unit("iot-unit:math.fraction.percent"))
    .make();

exports.binding = {
    bridge: require('../NestBridge').Bridge,
    model: exports.Model,
    matchd: {
        'iot:vendor.model': 'Nest Thermostat',
    },
};
