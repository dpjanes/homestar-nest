/*
 *  NestCam.js
 *
 *  David Janes
 *  IOTDB
 *  2015-10-18
 */

"use strict";

var iotdb = require("iotdb");

exports.Model = iotdb.make_model('NestCam')
    .facet(":security")
    .name("NestCam")
    .description("Nest Camera")
    .i("animated_image_url", iotdb.string.iri.image)
    .i("image_url", iotdb.string.iri.image)
    .i("start_time", iotdb.datetime.start)
    .i("end_time", iotdb.datetime.end)
    .make();

exports.binding = {
    bridge: require('../NestBridge').Bridge,
    model: exports.Model,
    matchd: {
        'iot:vendor.model': 'Nest Cam',
    },
};


/*
  is_online: true,
  is_streaming: true,
  last_event: 
   { animated_image_url: 'https://developer.nest.com/simulator/api/v1/nest/devices/camera/images/animated_image/CjZOQUtyZlZQWkQxRnRVSDJaeURhY1FxNmNIRWVRRmVFU2FqODIyR3FPVmpWNl9XQVFhV0JXZFESFjFlaDFLZ1B2TEhHZ3Y0YWItVUN2RUEaNm1LRC1wOTQ1bEpVdEVwOXVlZUNYMXRVODVLVkxUUVRRdHZEcEJCbUl3Zy1iQTQxUWNaVXBNZw/cKzy8JdpNLLwKZPc6Go-pMpiIoOYVZTW?auth=c.yWxkYpLw4mrdakUeG8EZJUBZypg47dVMT6n7EakmPv1xvAZhY0u7HcFIxwW0GHTKKZyMHsWGxMYy2TxMcuYBExmqnaXp1XDBRBLzcvbgX0bKcM3XXMjWNecWMCXocmR1bJdeaZCYsoKjyknU',
     image_url: 'https://developer.nest.com/simulator/api/v1/nest/devices/camera/images/image/CjZOQUtyZlZQWkQxRnRVSDJaeURhY1FxNmNIRWVRRmVFU2FqODIyR3FPVmpWNl9XQVFhV0JXZFESFjFlaDFLZ1B2TEhGN2ZEaWZMX1FfcmcaNm1LRC1wOTQ1bEpVdEVwOXVlZUNYMXRVODVLVkxUUVRRdHZEcEJCbUl3Zy1iQTQxUWNaVXBNZw/Kgs4hirm_YgNCc99QJG6NX4FvE9u2uVE?auth=c.yWxkYpLw4mrdakUeG8EZJUBZypg47dVMT6n7EakmPv1xvAZhY0u7HcFIxwW0GHTKKZyMHsWGxMYy2TxMcuYBExmqnaXp1XDBRBLzcvbgX0bKcM3XXMjWNecWMCXocmR1bJdeaZCYsoKjyknU',
     start_time: '2015-10-01T18:47:02.915Z',
     web_url: 'https://home.nest.com/cameras/CjZOQUtyZlZQWkQxRnRVSDJaeURhY1FxNmNIRWVRRmVFU2FqODIyR3FPVmpWNl9XQVFhV0JXZFESFjFlaDFLZ1B2TEhGN2ZEaWZMX1FfcmcaNm1LRC1wOTQ1bEpVdEVwOXVlZUNYMXRVODVLVkxUUVRRdHZEcEJCbUl3Zy1iQTQxUWNaVXBNZw/cuepoints/moGZxZy9cxreXcFEjxsmQt93fv3azMlf?auth=c.yWxkYpLw4mrdakUeG8EZJUBZypg47dVMT6n7EakmPv1xvAZhY0u7HcFIxwW0GHTKKZyMHsWGxMYy2TxMcuYBExmqnaXp1XDBRBLzcvbgX0bKcM3XXMjWNecWMCXocmR1bJdeaZCYsoKjyknU' },
  last_is_online_change: '2015-08-03T04:05:06.637Z',

*/
