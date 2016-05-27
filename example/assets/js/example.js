
// DOM Ready
jQuery(function($){

  // Get canvas
  var canvas = $('#example')[0];

  // AJAX Request for video data
  $.ajax({
    type: 'GET',
    mimeType: 'text/plain; charset=x-user-defined',
    url: 'assets/videos/video.webm',
    success: function(data){

      // Normalize the data
      data = data.split('').map(function(e){
        return e.charCodeAt(0) & 0xff;
      });

      // Create new instance of webm player with canvas object
      var player = new webm(canvas);

      // Run player with video data
      player.run(data);
    }
  });

});