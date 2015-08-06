/*
 *  NestBridge.js
 *
 *  David Janes
 *  IOTDB.org
 *  2015-06-16
 *
 *  Copyright [2013-2015] [David P. Janes]
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

"use strict";

var path = require('path');

var iotdb = require('iotdb');
var _ = iotdb._;
var bunyan = iotdb.bunyan;

var Firebase = require('firebase')

var logger = bunyan.createLogger({
    name: 'homestar-nest',
    module: 'NestBridge',
});

/**
 *  See {iotdb.bridge.Bridge#Bridge} for documentation.
 *  <p>
 *  @param {object|undefined} native
 *  only used for instances, should be 
 */
var NestBridge = function (initd, native) {
    var self = this;

    self.initd = _.defaults(initd,
        iotdb.keystore().get("bridges/NestBridge/initd"), {
            poll: 30
        }
    );
    self.native = native;   // the thing that does the work - keep this name

};

NestBridge.prototype = new iotdb.Bridge();

NestBridge.prototype.name = function () {
    return "NestBridge";
};

/* --- lifecycle --- */

/**
 *  See {iotdb.bridge.Bridge#discover} for documentation.
 */
NestBridge.prototype.discover = function () {
    var self = this;

    logger.info({
        method: "discover"
    }, "called");

    self._firebase(function(error, firebase) {
        if (error) {
            logger.info({
                error: _.error.message(error),
                method: "discover",
            }, "could not connect to Firebase/Nest");
            return;
        }

        firebase.once('value', function(snapshot) {
            var vd = snapshot.val();
            var deviced = _.d.get(vd, "/devices", {});

            var types = [ "smoke_co_alarms", "thermostats" ];
            for (var ti in types) {
                var type = types[ti];
                var dd = _.d.get(deviced, type);
                for (var d_id in dd) {
                    var native = {
                        type: type,
                        device: dd[d_id],
                        firebase: firebase.child("devices").child(type).child(d_id),
                    }

                    self.discovered(new NestBridge(_.defaults({}, self.initd), native));
                }
            }
        });
    });
};

/**
 *  See {iotdb.bridge.Bridge#connect} for documentation.
 */
NestBridge.prototype.connect = function (connectd) {
    var self = this;
    if (!self.native) {
        return;
    }

    self._validate_connect(connectd);

    self.native.firebase
        /*
        .child("devices")
        .child(self.native.type)
        .child(self.native.device.device_id)
        */
        .on('value', function(snapshot) {
            self.native.device = snapshot.val();
            self.pulled(self.native.device);
        });
};

NestBridge.prototype._forget = function () {
    var self = this;
    if (!self.native) {
        return;
    }

    logger.info({
        method: "_forget"
    }, "called");

    self.native = null;
    self.pulled();
};

/**
 *  See {iotdb.bridge.Bridge#disconnect} for documentation.
 */
NestBridge.prototype.disconnect = function () {
    var self = this;
    if (!self.native || !self.native) {
        return;
    }

    self._forget();
};

/* --- data --- */

/**
 *  See {iotdb.bridge.Bridge#push} for documentation.
 */
NestBridge.prototype.push = function (pushd, done) {
    var self = this;
    if (!self.native) {
        done(new Error("not connected"));
        return;
    }

    self._validate_push(pushd);

    logger.info({
        method: "push",
        pushd: pushd
    }, "push");

    self.native.firebase.update(pushd, function() {
        // self.native.device.update(pushd)
        done();
    });
};

/**
 *  See {iotdb.bridge.Bridge#pull} for documentation.
 */
NestBridge.prototype.pull = function () {
    var self = this;
    if (!self.native) {
        return;
    }
};

/* --- state --- */

/**
 *  See {iotdb.bridge.Bridge#meta} for documentation.
 */
NestBridge.prototype.meta = function () {
    var self = this;
    if (!self.native) {
        return;
    }

    var metad = {
        "iot:thing-id": _.id.thing_urn.unique("Nest", self.native.device.device_id),
        "schema:name": self.native.device.name_long || "Nest",
        "schema:manufacturer": "https://nest.com/",
    };

    if (self.native.type === "smoke_co_alarms") {
        metad["iot:vendor.model"] = "Nest Protect";
    } else if (self.native.type === "thermostats") {
        metad["iot:vendor.model"] = "Nest Thermostat";
    }

    return metad;
};

/**
 *  See {iotdb.bridge.Bridge#reachable} for documentation.
 */
NestBridge.prototype.reachable = function () {
    return this.native !== null;
};

/**
 *  See {iotdb.bridge.Bridge#configure} for documentation.
 */
NestBridge.prototype.configure = function (app) {
    var self = this;

    self.html_root = app.html_root || "/";

    // var ds = self._find_devices_to_configure();

    app.use('/$', function (request, response) {
        self._configure_root(request, response);
    });

    return "Nest";
};

NestBridge.prototype._configure_root = function (request, response) {
    var self = this;

    var template = path.join(__dirname, "templates", "root.html");
    var templated = {
        html_root: self.html_root,
    };

    if (request.method === "POST") {
        var access_token = request.body.access_token;
        if (access_token && access_token.length) {
            var access_token_key = "/bridges/NestBridge/account/access_token";
            iotdb.keystore().save(access_token_key, access_token);

            templated.ok = true;
        }
    }

    response
        .set('Content-Type', 'text/html')
        .render(template, templated);
};

/* -- internals -- */

var _firebase = null;
var _pending_firebase = null;
var _pending_dones = [];


/**
 */
NestBridge.prototype._firebase = function (done) {
    var self = this;

    if (_firebase) {
        return done(null, _firebase);
    }

    var access_token_key = "/bridges/NestBridge/account/access_token";
    var access_token = iotdb.keystore().get(access_token_key);
    if (!access_token) {
        logger.error({
            cause: "see https://homestar.io/tools/nest",
        }, "NestBridge not configured");

        return done(new Error("NestBridge not configured"));
    }

    if (_pending_dones !== null) {
        _pending_dones.push(done);
    }

    if (_pending_firebase) {
        return;
    }

    _pending_firebase = new Firebase('wss://developer-api.nest.com');
    _pending_firebase.authWithCustomToken(access_token, function(error) {
        if (error) {
            _pending_firebase = null;

            var dones = _pending_dones;
            _pending_dones = [];

            dones.map(function(done) {
                done(error);
            });
        } else {
            _firebase = _pending_firebase;
            _pending_firebase = null;

            var dones = _pending_dones;
            _pending_dones = null;

            dones.map(function(done) {
                done(null, _firebase);
            });
        }
    });
};

/*
 *  API
 */
exports.Bridge = NestBridge;
