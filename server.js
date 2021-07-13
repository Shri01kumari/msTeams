const express = require("express");
const bodyParser = require("body-parser");
const exphbs = require("express-handlebars");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server);
const { ExpressPeerServer } = require("peer");
const peerServer = ExpressPeerServer(server, {
  debug: true,
});

const nodemailer = require("nodemailer");
const { v4: uuidV4 } = require("uuid");
require("dotenv").config();
const users = {};

//view engine setup
app.set("view engine", "ejs");

app.use(express.static("public"));
app.use("/peerjs", peerServer);


//user authentication added
const { auth, requiresAuth } = require("express-openid-connect");
const { getMaxListeners } = require("process");
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
const meetId = uuidV4();

app.get("/", requiresAuth(), (req, res) => {
  res.render("home", {
    picture: req.oidc.user.picture,
    email_verified: req.oidc.user.email_verified,
  });
});

//used data from auth0 authentication to render profile page
app.get("/profile", requiresAuth(), (req, res) => {
  res.render("profile", {
    roomId: req.params.room,
    username: req.oidc.user.name,
    nickname: req.oidc.user.nickname,
    picture: req.oidc.user.picture,
    useremail: req.oidc.user.email,
    email_verified: req.oidc.user.email_verified,
  });
});

//redirecting user to a dynamic room
app.get("/meet", (req, res) => {
  res.redirect(`/${uuidV4()}`);
});

app.get("/calendar", requiresAuth(), (req, res) => {
  res.render("calendar", {
    picture: req.oidc.user.picture,
    email_verified: req.oidc.user.email_verified,
  });
});

app.get("/chat", requiresAuth(), (req, res) => {
  res.render("chat", {
    picture: req.oidc.user.picture,
    email_verified: req.oidc.user.email_verified,
    username: req.oidc.user.name,
  });
});

app.get("/whiteboard", requiresAuth(), (req, res) => {
  res.render("whiteboard", {
    picture: req.oidc.user.picture,
    email_verified: req.oidc.user.email_verified,
  });
});

app.get("/:room", requiresAuth(), (req, res) => {
  res.render("room", {
    roomId: req.params.room,
    username: req.oidc.user.name,
    useremail: req.oidc.user.email,
    email_verified: req.oidc.user.email_verified,
  });
});

//setting up events to listen to
io.on("connection", (socket) => {
  socket.on("new-user", (username) => {
    console.log(username);
    users[socket.id] = username;
    socket.broadcast.emit("user-joined", username);
  });
  socket.on("join-room", (roomId, userId) => {
    socket.join(roomId);
    socket.broadcast.to(roomId).emit("user-connected", userId);
  });

  socket.on("message", (message) => {
    socket.broadcast.emit("chat-message", {
      message: message,
      name: users[socket.id],
    });
  });
  socket.on("message", (message, roomId) => {
    socket.broadcast.to(roomId).emit("createMessage", message);
  });

  socket.on("disconnect", (roomId, userId) => {
    socket.broadcast.to(roomId).emit("user-disconnected", userId);
  });
});

// Mail sending route and relevant code
app.use(
  express.urlencoded({
    extend: false,
  })
);
app.use(express.json());

app.post("/send", function (req, res) {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "msteams.outlook.111@gmail.com",
      pass: "Microsoft11@teams",
    },
  });

  const output = `
  <h2>You have been invited to a meeting by ${req.body.user}.</h2>
  <p>Credentials for the meeting are:
  <br>
  Meeting URL: https://teams-clone-appv3.herokuapp.com/${req.body.ROOM_ID}
  <br>
  Meeting Id : ${req.body.ROOM_ID}
  </p>`;

  let mailOptions = {
    from: "msteams.outlook.111@gmail.com",
    to: req.body.receiveremail,
    subject: `MS Teams invite by ${req.body.user}`,
    html: output,
  };
  transporter.sendMail(mailOptions, function (err, data) {
    if (err) {
      console.log("Error Occurs: ", err);
    } else {
      console.log("Email sent!!!");
    }
  });
});

server.listen(process.env.PORT || 3000, () => {
  console.log("Server started at port 3000");
});

// For Testing Purpose
// Change the BASE_URL in .env file to http://localhost:3000
