import express from 'express';
import mongoose from 'mongoose';
import Cors from 'cors';
import Users from './models/Users.js';
import Chats from './models/Chats';

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
  const user = req.body;
  try {
    const newUser = await Users.create(user);
    res.status(201).json({newUser});
  } catch (error) {
    res.status(400).json({message: error.message});
    throw error;
  }
});

app.post('/tinder/chats', async (req, res) => {
  const chat = req.body;
  try {
    const newChat = await Chats.create(chat);
    res.status(201).json({newChat});
  } catch (error) {
    res.status(400).json({message: error.message});
    throw error;
  }
});

app.get('/tinder/users', async (req, res) => {
  try {
    const users = await Users.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({message: error.message});
    throw error;
  }
});

app.get('/tinder/chats', async (req, res) => {
  try {
    const chats = await Chats.find();
    res.json(chats);
  } catch (error) {
    res.status(500).json({message: error.message});
    throw error;
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
