var config = require('./config')
var app, express, http, io, server, socket;
var bodyParser = require('body-parser');
var path = require("path");

http = require('http');
express = require('express');

app = express();

// Configure NodeJS Express server
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')));

server = http.createServer(app);


// This is the Express server and Port
// Where the webapp will receive requests
server.listen(config.socketio.port);
io = require('socket.io')(server);

app.get('/', function(req, res) {
	return res.sendFile(__dirname + '/Demo.html');
});

// Connect to the socket connection to wait for requests from the client 
io.on('connection', function(client) {
    console.log("A new client has connected");

    client.on("clientplayrequest", function(payload) {
    	console.log("Forwarding client play request: " + JSON.stringify(payload));
    	io.emit("playaudio", payload);
    });
});
