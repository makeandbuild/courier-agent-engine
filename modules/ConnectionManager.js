//Module for handling the connection and metadata related to the connection between the Courier HAL Engine and the Courier Server


// Connect to the socket connection to wait for requests from the client 
socket.sockets.on('connection', function(client) {
    currData.historywithbuffer(function(json) {
    	socket.emit('history', json);
    });
    return null;
});

var config = require("./config");
var moment = require("moment");

function ConnectionManager() {
	console.log("Created ConnectionManager component");
}

module.exports.ConnectionManager = ConnectionManager;

