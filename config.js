var config = {}

config.courier = {};
config.socketio = {};
config.audio = {};
config.audio.rpi = {};

config.courier.protocol = "http";
config.courier.url = "54.165.174.111";
config.courier.port = "8081";

//Socketio configuration
config.socketio.port = process.env.WEB_PORT || 8081;

//Configuration for the Raspberry PI audio
config.audio.rpi.cachedir = "/Users/jeremydyer/Downloads/";
config.audio.rpi.s3url = "https://s3.amazonaws.com/makeandbuild/courier/audio/";

//TODO need to find the value nodejs provides for raspberry pi os.platform()
config.audio.players = {"darwin": {"mp3": "afplay", "wav": "afplay"}, "linux": {"mp3": "mpg123", "wav": "aplay"}};

module.exports = config;