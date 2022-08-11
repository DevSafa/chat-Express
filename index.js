// include express framework 
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
// include the socket io server
const { Server } = require("socket.io");
const io = new Server(server);

var cors = require('cors');

app.use(cors({
    origin: '*'
  }));

const port = 6600;

// if user send get request => serve index.html file
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// socket.io server keeps tracks to all connected socket
// get all conencted socketes to the socket.io serevr ==> so get users
const getVisitors = () => {
  let clients = io.sockets.clients.connected;
  let sockets = Object.values(clients)
}

// if there is any connection is called   (when we serve index.html a new connection is created |  create new socket)
// when user connect to our server , the envent 'conenction' is called

io.on('connection', (socket) => {
    //socket is the connecting client socket
  console.log('a user connected');

   //listen to annother event
   // pass the data about user when we emit the event "new_visitor" to our server
   socket.on("new_visitor",user =>{
    
    console.log("new_visitor",user);
    // bind the user to this connected socket 
    socket.user = user;
   })


  //call "disconenct event when the socket is disconnected"
  socket.on("disconnect",function(){
    console.log("user disconnected");
  });
});

server.listen(port, () => {
  console.log(`listening on : ${port}`);
});