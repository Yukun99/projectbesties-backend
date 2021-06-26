import express from 'express';
import mongoose from 'mongoose';
import Cors from 'cors';
import UserRoute from './routers/users.js';
import ChatRoute from './routers/chats.js';
import MessageRoute from './routers/messages.js';
import {Server} from 'socket.io';

//App Config
export const app = express();
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

//API Endpoints (just for testing on heroku to see if server is started)
//Remaining endpoints are located in routers
app.get('/', (req, res) => {
  res.status(200).send('Bruh');
});

app.use('/tinder/users', UserRoute);
app.use('/tinder/chats', ChatRoute);
app.use('/tinder/messages', MessageRoute);

//Listener
const server = app.listen(port, () => {
  console.log((`listening on localhost: ${port}.`));
});

// SocketIO socket. Turns out an express server is just an http server.
const io = new Server(server);

let users = [];

function addUser(userId, socketId) {
  if (!users.some(user => user.userId === userId)) {
    users.push({userId, socketId});
  }
}

function removeUser(socketId) {
  users = users.filter(user => user.socketId !== socketId);
}

function getUser(userId) {
  return users.find(user => user.userId === userId);
}

io.on('connection', (socket) => {
  // User connection
  console.log('A user has connected with socket ID: ' + socket.id);

  // Receive new User ID and store it
  socket.on('addUser', userID => {
    addUser(userID, socket.id);
    console.log('A user has been added with user ID: ' + userID);
  });

  // Receive sent messages
  socket.on('newMessage', ({recipientId, message}) => {
    const recipient = getUser(recipientId);
    io.to(recipient.socketId).emit('newMessage', {
      message,
    });
  });

  // User disconnecting
  socket.on('disconnect', () => {
    removeUser(socket.id);
    console.log('A user has disconnected with socket ID: ' + socket.id);
  });
});
