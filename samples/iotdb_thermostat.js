/*
 *  How to use this module in IOTDB / HomeStar
 *  This is the best way to do this
 *  Note: to work, this package must have been installed by 'homestar install' 
 */

"use strict";

const iotdb = require('iotdb');
iotdb.use("homestar-nest");

const things = iotdb.connect('NestThermostat');
things.on("state", function(thing) {
    console.log("+", "state\n ", thing.thing_id(), "\n ", thing.state("istate"));
});
things.on("meta", function(thing) {
    console.log("+", "meta\n ", thing.thing_id(), "\n ", thing.state("meta"));
});
things.on("thing", function(thing) {
    console.log("+", "discovered\n ", thing.thing_id(), "\n ", thing.state("meta"));
});

const count = 0;
setInterval(function() {
    things.set(":temperature", 18 + count++ % 5);
}, 5 * 1000);


