/*
 *  How to use this module in IOTDB / HomeStar
 *  This is the best way to do this
 *  Note: to work, this package must have been installed by 'homestar install' 
 */

"use strict";

var iotdb = require('iotdb');
var iot = iotdb.iot();

var things = iot.connect('NestThermostat');
things.on("state", function(thing) {
    console.log("+", "state\n ", thing.thing_id(), "\n ", thing.state("istate"));
});
things.on("meta", function(thing) {
    console.log("+", "meta\n ", thing.thing_id(), "\n ", thing.state("meta"));
});
things.on("thing", function(thing) {
    console.log("+", "discovered\n ", thing.thing_id(), "\n ", thing.state("meta"));
});

var count = 0;
setInterval(function() {
    things.set(":temperature", 18 + count++ % 5);
}, 5 * 1000);


