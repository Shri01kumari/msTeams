const express = require("express");
const app = express();
// const cors = require('cors')
// app.use(cors())
const server = require("http").Server(app);
const io = require("socket.io")(server);
const { ExpressPeerServer } = require("peer");
const peerServer = ExpressPeerServer(server, {
  debug: true,
});
const users = {};
const { v4: uuidV4 } = require("uuid");
require("dotenv").config();
app.use("/peerjs", peerServer);

app.set("view engine", "ejs");
app.use(express.static("public"));
// app.use(express.static(path.join(__dirname, "public")));

//user authentication added
const { auth, requiresAuth } = require("express-openid-connect");

app.use(
  auth({
    authRequired: false,
    auth0Logout: true, //to logout
    issuerBaseURL: process.env.ISSUER_BASE_URL,
    baseURL: process.env.BASE_URL,
    clientID: process.env.CLIENT_ID,
    secret: process.env.SECRET,
    idpLogout: true,
  })
);

// app.get("/", (req, res) => {
//   // res.send(req.oidc.isAuthenticated()?'Logged in':'Logged out');
//   res.render("home");
// });
app.get('/', requiresAuth(), (req, res) => {
  //res.redirect(`/${uuidV4()}`);
  res.render("home");
});
app.get("/profile", requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
});
app.get("/meet", (req, res) => {
  res.redirect(`/${uuidV4()}`);
});

app.get("/:room", (req, res) => {
  res.render("room", { roomId: req.params.room });
});

io.on("connection", (socket) => {
  socket.on('new-user', (username) => {
     console.log(username);
    users[socket.id] = username;
    socket.broadcast.emit('user-joined', username);
  });


  socket.on("join-room", (roomId, userId) => {
    socket.join(roomId);
    socket.broadcast.to(roomId).emit("user-connected", userId);
  });
  //   socket.on('message',message=>{
  //     socket.broadcast.emit('chat-message',{message: message, name: users[socket.id]});
  //  })
  socket.on('message', message => {
    socket.broadcast.emit('chat-message', { message: message, name: users[socket.id] });
  });
  socket.on("message", (message,roomId) => {
    //send message to the same room
    //io.to(roomId).emit('createMessage', message)

    //socket.to(roomId).broadcast.emit('createMessage',message)
    //socket.broadcast.emit('createMessage',message)
    socket.broadcast.to(roomId).emit("createMessage", message);
  });

  socket.on("disconnect", (roomId,userId) => {
    socket.broadcast.to(roomId).emit("user-disconnected", userId);
  });
});


server.listen(process.env.PORT || 3000, () => {
  console.log("Server started at port 3000");
});
