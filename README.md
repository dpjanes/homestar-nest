# homestar-nest
IOTDB / HomeStar Controller for Nest Devices

<img src="https://github.com/dpjanes/iotdb-homestar/blob/master/docs/HomeStar.png" align="right" />

See <a href="samples/">the samples</a> for details how to add to your project,
particularly <code>connect.js</code> for standalone
and <code>iotdb\*.js</code> for HomeStar/IOTDB.

Support for Nest Cam coming soon.

# Installation

Install Home☆Star first. 
See: https://github.com/dpjanes/iotdb-homestar#installation

Then

    $ homestar install homestar-nest

# Quick Start

Set the temperature to 20 celsius

	$ npm install -g homestar ## with 'sudo' if error
	$ homestar setup
	$ homestar install homestar-nest
    $ homestar configure homestar-nest ## or add API keys manually
	$ node
	>>> iotdb = require('iotdb')
	>>> things = iotdb.connect("NestThermostat")
	>>> things.set(":temperature", 20)

# Configuration

Run

    $ homestar configure homestar-nest

Or just go to this page and follow the instructions

    https://homestar.io/tools/nest

If you don't have a Nest, they provide a very nice simulator

    https://developer.nest.com/documentation/cloud/home-simulator

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
