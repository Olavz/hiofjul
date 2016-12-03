var socket = io();

$( document ).ready(function() {
  
  socket.on('calendar', function(data){ // 120 min since last motion
    // calendar.day.open();
  });

  socket.on('santa', function(data){ // 15 min since last motion
    // santa.begin();
  });

  socket.on('snow', function(data){ // 1 min since last motion
    // snow.begin();
  });

});


