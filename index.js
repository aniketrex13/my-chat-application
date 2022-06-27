// server side
const app = require('express')();
const server = require('http').createServer(app);
const path = require("path");
const express = require("express");
const io = require("socket.io")(server,{
  cors: {
    origin: ["*"],
    allowedHeaders: ["my-custom-header"],
    credentials: true
  }
});

app.use(express.static(path.join(__dirname, 'gandhi')));
var users={}
app.get("/",function(req,res){
  res.sendFile(
      path.join(__dirname,"gandhi/index.html")
  );
});


server.listen(3000, () => {
  console.log('listening on *:3000...');
});

io.on('connection',socket=>{
  console.log("connection to server");

    socket.on('new-user-joined',name=>{
      console.log("kaam to kar raha hai");
        users[socket.id] = name;
        socket.broadcast.emit('user-joined',name);
    });

    socket.on('send',message=>{
        socket.broadcast.emit('recive',{message:message,name:users[socket.id]})
    });
})
