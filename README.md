# Courier Engine (nodejs)
The Courier project is broken down into four pieces - Agent, Engine, Server & Admin Console - and is divided up between three different repos.

1. Agent - https://github.com/makeandbuild/courier-agent-nodejs
2. Server & Admin Console - https://github.com/makeandbuild/Courier
3. Engine - https://github.com/makeandbuild/courier-agent-engine

For a high level overview including architecture diagrams refer to our blog post [Courier iBeacon Implementation](http://makeandbuild.com/blog/post/courier-ibeacon-implementation)

## Summary

This code listens for a message from the server specifying an action to perform.  To be more specific, the action to perform is to play a specified audio file.  

We run this code on the same Raspberry Pi that the agent code is running on, but this could easily be separated to different devices.  This code also runs on OSX.

It uses socket.io to register with the server and then listens for playaudio events. 

```javascript
socket.on('playaudio', function(payload) {
    console.log('Courier has requested this RPI play: ' + JSON.stringify(payload));
    // code to play audio file
});
```

## Setup

```
npm install
```

## Run
```
node engine.js
```

## Demo
A quick demo of this code running standalone can be done by running two separate node instances:
```
node demo.js
```
and then in a separate console window:
```
node engine.js
```
Then navigate your browser to http://localhost:9000 and click the 'Hello' button to play the hello.mp3 file.

## Roadmap
This repo is a work in progress - IT IS NOT PRODUCTION READY. 

This is subject to change, but the items that we plan to work on next are the following:

- Download audio files from S3 automatically (currently you have to manually download the files and point the config to the directory they are in)
- Use authentication wtih socket.io connection to the server
