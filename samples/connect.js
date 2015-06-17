/*
 *  NOTE: prefer to do the way 'model.js' works
 *  Connect to a Denon AVR at a named host
 */

"use strict";

var NestBridge = require('../NestBridge').Bridge;

var nest = new NestBridge();
nest.discovered = function (bridge) {
    console.log("+ got one\n ", bridge.meta());
    bridge.pulled = function (state) {
        console.log("+ state-change\n ", state);
    };
    bridge.connect({});
    /*
    bridge.push({
        target_temperature_c: 0.5,
    }, function() {});
    */
};
nest.discover();
