module.exports = {
    name: 'Engine 1',
    location: 'Lobby',
    courier : {
        protocol : 'http',
        url : 'localhost',
        port : '9000'
    },
    socketio : {
        port : 9000
    },
    capabilities : ['audio'],
    audio : {
        rpi : {
            cachedir : 'public/'
            //cachedir : '/home/pi/.audio/',
        },
        //TODO need to find the value nodejs provides for raspberry pi os.platform()
        players : {
            "darwin": {
                "mp3": "afplay",
                "wav": "afplay"
            },
            "linux": {
                "mp3": "mpg123",
                "wav": "aplay"
            }
        }
    }
}