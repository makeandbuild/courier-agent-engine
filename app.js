var config = require('./config')

var socket = require('socket.io-client')('http://54.165.174.111:8081');
socket.on('connect', function(){console.log("A connection was made")});
socket.on('msg', function(payload){console.log("CONNECTION: " + payload)});
socket.on('disconnect', function(){console.log("Disconnection occured")});

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