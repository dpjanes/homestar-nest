# homestar-nest
[IOTDB](https://github.com/dpjanes/node-iotdb) Bridge for Nest Devices

<img src="https://raw.githubusercontent.com/dpjanes/iotdb-homestar/master/docs/HomeStar.png" align="right" />

# About

See <a href="samples/">the samples</a> for details how to add to your project,
particularly <code>connect.js</code> for standalone
and <code>iotdb\*.js</code> for HomeStar/IOTDB.

* [Read about Bridges](https://github.com/dpjanes/node-iotdb/blob/master/docs/bridges.md)

# Installation and Configuration

* [Read this first](https://github.com/dpjanes/node-iotdb/blob/master/docs/install.md)
* [Read about installing Home☆Star](https://github.com/dpjanes/node-iotdb/blob/master/docs/homestar.md) 

    $ npm install -g homestar    ## may require sudo
    $ homestar setup
    $ npm install homestar-nest
    $ homestar configure homestar-nest

You'll need the instructions on this page to complete configuratio

    https://homestar.io/tools/nest

If you don't have a Nest, they provide a very nice simulator

    https://developer.nest.com/documentation/cloud/home-simulator

# Use

	const iotdb = require('iotdb')
    iotdb.use("homestar-nest")
	iotdb.connect("NestThermostat").set(":temperature", 20)

# Models
## NestThermostat

Control Nest Thermostat

Functionality:

* discover Nest Thermostats
* get target temperature, actual temperature and humidity
* set target temperature

    {
        target_temperature_c: 18,
        ambient_temperature_c: 14,
        humidity: 30
    }

## NestProtect

Read values from Nest Protect

    {
        co_alarm_state: 'warning',
        smoke_alarm_state: 'ok',
        battery_health: 'ok'
    }

## NestCam

Read values from Nest Camera. In particular, it will change state
when new "events" happen.

    {
        animated_image_url: 'https://developer.nest.com/...',
        image_url: 'https://developer.nest.com/simulator/...',
        start_time: '2015-10-22T15:12:14.140Z',
        end_time: '2015-10-22T15:12:15.161Z'
    }
