// include express framework 
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
// include the socket io server
const { Server } = require("socket.io");
const io = new Server(server);

// if user send get request => serve index.html file
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// if there is any connection is called   (when we serve index.html a new connection is created |  create new socket)
// when user connect to our server , the envent 'conenction' is called
io.on('connection', (socket) => {
    //socket is the connecting client socket
  console.log('a user connected');
  //call "disconenct event when the socket is disconnected"
  socket.on("disconnect",function(){
    console.log("user disconnected");
  })
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});