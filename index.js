var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendfile('index.html');
});

io.on('connection', function(socket){

socket.on('join', function (data) {
    socket.join(data.id); 
  });
  console.log('new connection');
  socket.on('chat message', function(msg){
       io.sockets.in('te').emit('chat message', msg);
    console.log('message: ' + msg);
  });
});

http.listen(8088, function(){
  console.log('listening on *:8088');
});