module.exports = {
    courier : {
        protocol : 'http',
//        url : 'localhost',
        url : '54.165.174.111',
//        port : '8081'
        port : '9000'
    },
    socketio : {
        port : 9000
    },
    capabilities : ['audio'],
    audio : {
        rpi : {
            cachedir : '/home/pi/.audio/',
//            cachedir : '/Users/lindsaythurmond/Music/courier/',
            s3url : 'https://s3.amazonaws.com/makeandbuild-courier/'
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