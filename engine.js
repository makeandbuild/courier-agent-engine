var config = require('./config');
var getmac = require('getmac');

//Makes the connection to the courier server
var url = config.courier.protocol + '://' + config.courier.url + ':' + config.courier.port + '/engine';
var socket = require('socket.io-client')(url);

//[Lindsay Thurmond:2/9/15] TODO: cache audio files if we don't already have them

socket.on('connect', function() {

    console.log('Connected!');

	//Load the RPI audio playback code.
	var rpb = require('./modules/RPIAudioPlayback');
	var audio = new rpb.RPIAudioPlayback(config, socket);

	//Listen for the command from courier to play a audio file
	socket.on('playaudio', function(payload) {
		console.log("Courier has requested this RPI play: " + JSON.stringify(payload));
		audio.playCachedFile(payload);
	});

	socket.on('disconnect', function(){console.log("Disconnection occurred")});

    // tell the server about ourselves
    getmac.getMac(function(err, macAddress) {
        socket.emit('register',  {
            capabilities : config.capabilities,
            macAddress : macAddress,
            name : config.name,
            location : config.location
        });
    });

});

// We need to gracefully exit
process.on('SIGINT', function() {
	console.log( "\nGracefully shutting down from SIGINT (Ctrl-C)" );

	//If we fail to shutdown gracefully then we should forcefully disconnect to keep the process from hanging.
	setTimeout(function() {
		terminateApp(true);
	}, 10000);

	//Currently nothing to disconnect from so just shutdown the application
	terminateApp(false);
})

//Function to terminate the application.
var terminateApp = function(forced) {
	if (forced) {
		console.warn("Application was forcefully terminated! Certain connections may have not gracefully closed.")
	}
	process.exit();
};