/*
 *  NestProtect.js
 *
 *  David Janes
 *  IOTDB
 *  2015-06-16
 */

var iotdb = require("iotdb");

exports.Model = iotdb.make_model('NestProtect')
    .facet(":security")
    .name("NestProtect")
    .description("Nest Protect")
    .make();

exports.binding = {
    bridge: require('../NestBridge').Bridge,
    model: exports.Model,
};
