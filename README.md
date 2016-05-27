VP8 WebM JavaScript Decoder
=============================

[![No Maintenance Intended](http://unmaintained.tech/badge.svg)](http://unmaintained.tech/)

A JavaScript WEBM Decoder.

# Example

An example of implementing the decoder can be found in `example/`. The example requires you run on a server. To do this locally, you can spin up a simple Python server with by navigating to the root directory and running the following code:

````
$ python -m SimpleHTTPServer
````

**Example JS**

```javascript
var canvas = document.getElementBy('canvas');
var player = new webm(canvas);
player.run(videoData);
````

# Options

Currently, there is only the option to `loop` the video.

**Example JS**

```javascript
var canvas = document.getElementBy('canvas');
var player = new webm(canvas, {loop:true});
player.run(videoData);
````

