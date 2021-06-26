const express = require('express')
const app = express()
// const cors = require('cors')
// app.use(cors())
const server = require('http').Server(app)
const io = require('socket.io')(server)
const { ExpressPeerServer } = require('peer');
const peerServer = ExpressPeerServer(server, {
  debug: true
});
const { v4: uuidV4 } = require('uuid')

app.use('/peerjs', peerServer);

app.set('view engine', 'ejs')
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.redirect(`/${uuidV4()}`)
})

app.get('/:room', (req, res) => {
  res.render('room', { roomId: req.params.room })
})

io.on('connection', socket => {
  socket.on('join-room', (roomId, userId) => {
    socket.join(roomId)
    socket.broadcast.to(roomId).emit('user-connected', userId);
    // messages
  //   socket.on('message',message=>{
  //     socket.broadcast.emit('chat-message',{message: message, name: users[socket.id]});
  //  });
    socket.on('message', (message) => {
      //send message to the same room
      //io.to(roomId).emit('createMessage', message)
      console.log("Shrishti");
      console.log(message);
      //socket.to(roomId).broadcast.emit('createMessage',message)
      socket.broadcast.emit('createMessage',message)
  }); 

    socket.on('disconnect', () => {
      socket.to(roomId).broadcast.emit('user-disconnected', userId)
    })
  })
})

server.listen(process.env.PORT||3030)



// var express = require('express');
// var app = express();
// var http = require('http');
// var events = require('events');
// var server = http.createServer(app)

// const { v4: uuidV4 } = require('uuid')
// const newID = uuidV4();
// var io = require('socket.io')(server)
// app.set('view engine', 'ejs');
// app.use(express.static('public'));


// app.get('/', (req, res) => {
//     res.redirect(`/${uuidV4()}`);
// })


// // app.get('/home', function (req, res) {
// //     res.render('home');
// // })
// app.get('/:room', (req, res) => {
//     res.render('room', { roomId: req.params.room })
// })

// server.listen(3000, 'localhost', function () {
//     console.log('Server listening to port 3000');
// })

