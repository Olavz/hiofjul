var app = require('express')();
var express = require('express');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require("path");

var motion = {'last' : -1};

app.use(express.static(path.join(__dirname, '/')));

app.get('/', function(req, res){
  res.sendFile(path.resolve("inc/html/index.html"));
});

app.get('/landing', function(req, res){
  res.sendFile(path.resolve("inc/html/landing.html"));
});

app.get('/event/:event/:action', function(req, res){
  var p = req.param("event");
  var a = req.param("action");
  
  if(a == 1){
    var now = new Date();
    var idleTime = (now - motion.last)/1000;
    
    console.log("idleTime: "+ idleTime);
    
    if(idleTime > 2*60*60){
      console.log("sending event: calendar");
      io.emit("calendar");
    }
    else if(idleTime > 15*60){
      console.log("sending event: santa");
      io.emit("santa");
    }
    else{
      console.log("sending event: snow");
      io.emit("snow");
    }
    
    motion.last = now;
  }
  else{
    if(req.param("event") == "date"){
      io.emit("date", req.param("action"));
    }
    //console.log("event: "+ p+ " action: "+ a);
  } 
  
  res.end(p);
});

/*
io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });

  socket.on('lal', function(msg){
    io.emit('chat message', "user connected "+msg);
  });

  socket.on('disconnect', function(){
    io.emit('chat message', "user disconnected");
  });
});
*/




var PORT = 2014;
http.listen(PORT, function(){
  console.log('listening on *:'+PORT);
  
  setInterval(function(){
    io.emit("date", new Date().getDate() + ". Desember");
    
  }, 1000*60);
});
