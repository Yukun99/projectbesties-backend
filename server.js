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

app.put('/tinder/users/:email', async (req, res) => {
  try {
    const currUser = await User.findOne({email: req.body.email});
    const schemaKeys = Object.keys(User.schema.paths);
    const user = req.body;
    const userKeys = Object.keys(user);
    const userValues = Object.values(user);
    for (let i = 0; i < userKeys.length; ++i) {
      // safety check in case of bad key
      if (schemaKeys.includes(userKeys[i])) {
        currUser[userKeys[i]] = userValues[i];
      }
    }

    const updatedUser = await User.updateOne(
      {email: user.email},
      {$set: currUser},
    );
    res.send(currUser);
  } catch (err) {
    res.status(400).send({message: err.message});
  }
});

//Listener
app.listen(port, () => {
  console.log((`listening on localhost: ${port}.`));
});
