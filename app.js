var config = require('./config')
var io = require('socket.io');

var socket = io.connect("http://localhost:8081");

socket.on('msg', function (payload) {
  console.log("CONNECTION: " + payload);
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