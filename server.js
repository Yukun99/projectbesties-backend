import express from 'express';
import mongoose from 'mongoose';
import Cors from 'cors';
import User from './models/User.js';
import Chat from './models/Chat.js';

//App Config
const app = express();
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
