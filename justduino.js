var Cylon = require('cylon');

var LAPTOP_PORT = '/dev/tty.usbmodem1411'
var MINI_LEFT_PORT = '/dev/tty.usbmodem1a12241';
var MINI_RIGHT_PORT = '/dev/cu.usbmodem1a12231';

//helpers
var displayResult = function(result) {
    console.log(JSON.stringify(result, null, 2));
}

var displayError = function(err) {
    console.error(err);
}

//map helper
function mappedVal(value) {
    return (100 * (value) / 1024);
}

Cylon.robot({
    connections: {
        arduino: {
            adaptor: 'firmata',
            port: LAPTOP_PORT,
            devices: {
                led: {
                    driver: 'led',
                    pin: 13
                },
                sensor: {
                    driver: 'analog-sensor',
                    pin: '0',
                    lowerLimit: 0,
                    upperLimit: 1027
                }
            }
        },
        // hue: {
        //     adaptor: 'hue',
        //     host: '10.0.0.7',
        //     username: '8bbc4fc35bb548f17cd0ad421947407',
        //     devices: {
        //         bulb: {
        //             driver: 'hue-light',
        //             lightId: 3
        //         }

        //     },
        // }
    },

    work: function(my) {
        var photoVal = 0;
        var briVal = 0;
        every((3).second(), function() {

            photoVal = my.sensor.analogRead();
            briVal = mappedVal(photoVal);
            console.log('Photo cell value is ' + photoVal);
            console.log('this translates to %' + briVal + 'brightness');
            // console.log('setting brightness...');
            // my.bulb.brightness(briVal);
            // console.log('done');

        });
    }
}).start();
