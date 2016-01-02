var Cylon = require('cylon');

Cylon.robot({
    connections: {
        arduino: {
            adaptor: 'firmata',
            port: '/dev/tty.usbmodem1a12241'
        }
    },

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

    },

    work: function(my) {
        var photoVal = 0;

        every((1).second(), function() {
            photoVal = my.sensor.analogRead();
            console.log('Photo cell value is ' + photoVal);
            my.led.toggle;
        });
    }
}).start();
