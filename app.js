var config = require('./config')

//Makes the connection to the courier server
var socket = require('socket.io-client')(config.courier.protocol + '://' + config.courier.url + ':' + config.courier.port);

socket.on('connect', function() {
	
	//Load the RPI audio playback code.
	var rpb = require('./modules/RPIAudioPlayback');
	var audio = new rpb.RPIAudioPlayback(config, socket);

	//Listen for the command from courier to play a audio file
	socket.on('playaudio', function(payload) {
		console.log("Courier has requested this RPI play: " + JSON.stringify(payload));
		audio.playCachedFile(payload);
	});

	socket.on('disconnect', function(){console.log("Disconnection occured")});
});

// We need to gracefully exit
process.on('SIGINT', function() {
	console.log( "\nGracefully shutting down from SIGINT (Ctrl-C)" );

	//If we fail to shutdown gracefully then we should forefully disconnect to keep the process from hanging.
	setTimeout(function() {
		terminateApp(true);
	}, 10000);

	//Currently nothing to disconnect from so jusy shutdown the application
	terminateApp(false);
})

//Function to terminate the application.
var terminateApp = function(forced) {
	if (forced) {
		console.warn("Application was forcefully terminated! Certain connections may have not gracefully closed.")
	}
	process.exit();
};