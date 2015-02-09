'use strict';

var config, exec, os, localCacheStore, socket;

exec = require('child_process').exec;
os = require("os");

localCacheStore = null;

function RPIAudioPlayback(globalConfig, globalSocket) {
	console.log("RPiAudioPlaybackComponent is online!");
	localCacheStore = {};
	config = globalConfig;
	socket = globalSocket;
}

RPIAudioPlayback.prototype.playCachedFile = function(payload) {

	if (payload.filename) {
		var parts = payload.filename.split(".");
		var fileExt = parts[parts.length - 1];
		console.log("File Extension: " + fileExt);
		var pbCmd = null;

		//Determines how the audio file should be played based on the host environment platform
		var platform = os.platform();
		if (config.audio.players[platform]) {
			var platPlayer = config.audio.players[platform][fileExt];
			if (platPlayer) {
				pbCmd = platPlayer + " " + config.audio.rpi.cachedir + payload.filename + " &";
				console.log("Executing command: " + pbCmd);
				//Executes the cmd if it is not null.
				if (pbCmd != null) {
					exec(pbCmd, function (error, stdout, stderr) {
					  // output is in stdout
					  console.log('stderr: ' + stderr + ' STDOUT: ' + stdout);
					});
				}
			} else {
				console.log("Platform: " + platform + " does not support the " + fileExt + " audio format. Inner");
			}
		} else {
			console.log("Platform: " + platform + " does not support the " + fileExt + " audio format");
		}

	} else {
		console.log("payload.filename was not found! Unable to determine audio file to play!");
	}
}

module.exports.RPIAudioPlayback = RPIAudioPlayback;
