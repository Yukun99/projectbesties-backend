import express from 'express';
import mongoose from 'mongoose';
import Cors from 'cors';
import User from './models/User.js';
import Chat from './models/Chat.js';
import {Server} from 'socket.io';

//App Config
const app = express();
const server = require("http").createServer(app);
const io = new Server(server);
const port = process.env.PORT || 8001;
const connection_url =
  `mongodb+srv://xu_yukun:Xx5iTj7hyXv!wMM@projectbesties.sytxr.mongodb.net/tinderShitBack?retryWrites=true&w=majority`;

//Middlewares
app.use(express.json());
app.use(Cors());

//DB Config
mongoose.connect(connection_url, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

//Socket Declarations
let clients = [];

io.on("connection", socket => {
  console.log("New User Connected");
  socket.on("storeClientInfo", function(data) {
    console.log(data.customId + " Connected");
    //store the new client
    let clientInfo = new Object();
    clientInfo.customId = data.customId;
    clientInfo.clientId = socket.id;
    clients.push(clientInfo);

    //update the active status
    const res = User.updateOne({ id: data.customId }, { isActive: true });
    res.exec().then(() => {
      console.log("Activated " + data.customId);

      //Notify others
      socket.broadcast.emit("update", "Updated");
      console.log("emmited");
    });
  });

  socket.on("disconnect", function(data) {
    for (let i = 0, len = clients.length; i < len; ++i) {
      let c = clients[i];

      if (c.clientId == socket.id) {
        //remove the client
        clients.splice(i, 1);
        console.log(c.customId + " Disconnected");

        //update the active status
        const res = User.updateOne({ id: c.customId }, { isActive: false });
        res.exec().then(data => {
          console.log("Deactivated " + c.customId);

          //notify others
          socket.broadcast.emit("update", "Updated");
        });
        break;
      }
    }
  });
});

//Messages Socket
const chatSocket = io.of("/tinder/chats");
chatSocket.on("connection", function(socket) {
  //On new message
  socket.on("newMessage", data => {
    //Notify the room
    socket.broadcast.emit("incomingMessage", "reload");
  });
});

//API Endpoints
app.get('/', (req, res) => {
  res.status(200).send('Bruh');
});

app.post('/tinder/users', async (req, res) => {
  const user = req.body;

  try {
    await User.create(user);
    res.status(201).send(user);
    console.log('test');
  } catch (err) {
    res.status(400).json({message: err.message});
  }
});

app.post('/tinder/chats', async (req, res) => {
  const chat = req.body;

  try {
    await Chat.create(chat);
    res.status(201).send(chat);
    console.log('test');
  } catch (err) {
    res.status(400).json({message: err.message});
  }
});

app.get('/tinder/users', async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.get('/tinder/chats', async (req, res) => {
  try {
    const chats = await Chat.find();
    res.send(chats);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.put('/tinder/users/:id', async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.body._id, req.body);
    res.send(updatedUser);
  } catch (err) {
    res.status(400).send({message: err.message});
  }
});

app.put('/tinder/chats/:id', async (req, res) => {
  try {
    const updatedChat = await Chat.findByIdAndUpdate(req.body._id, req.body);
    res.send(updatedChat);
  } catch (err) {
    res.status(400).send({message: err.message});
  }
});

//Listener
app.listen(port, () => {
  console.log((`listening on localhost: ${port}.`));
});
