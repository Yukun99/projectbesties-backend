import express from 'express';
import mongoose from 'mongoose';
import Cors from 'cors';
import User from './models/User.js';
import Chat from './models/Chat';

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
  res.status(200).send('Ayo why tf you here Alyssa');
});

app.post('/tinder/users', async (req, res) => {
  const newUser = new User({
    name: req.body.name,
    email: req.body.email,
    age: req.body.age,
    year: req.body.year,
    imgUrl: req.body.imgUrl,
    projects: req.body.projects,
    creationDate: req.body.creationDate,
  })
  try {
    let saveUser = await newUser.save();
    res.status(201).send({newUser});
  } catch (error) {
    res.status(400).send({message: error.message});
  }
});

app.post('/tinder/chats', async (req, res) => {
  const chat = req.body;
  try {
    const newChat = await Chat.create(chat);
    res.status(201).send({newChat});
  } catch (error) {
    res.status(400).send({message: error.message});
  }
});

app.get('/tinder/users', async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (error) {
    res.status(500).send({message: error.message});
  }
});

app.get('/tinder/chats', async (req, res) => {
  try {
    const chats = await Chat.find();
    res.send(chats);
  } catch (error) {
    res.status(500).send({message: error.message});
  }
});

// app.put('/tinder/users', (req, res) => {
//
//   },
// );

//Listener
app.listen(port, () => {
  console.log((`listening on localhost: ${port}.`));
});
