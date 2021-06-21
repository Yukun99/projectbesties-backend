import express from 'express';
import mongoose from 'mongoose';
import Cors from 'cors';
import UserRoute from './routers/users.js';
import ChatRoute from './routers/chats.js';
import MessageRoute from './routers/messages.js';

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

//API Endpoints (just for testing on heroku to see if server is started)
//Remaining endpoints are located in routers
app.get('/', (req, res) => {
  res.status(200).send('Bruh');
});

app.use('/api/users', UserRoute);
app.use('/api/chats', ChatRoute);
app.use('/api/messages', MessageRoute);

//Listener
app.listen(port, () => {
  console.log((`listening on localhost: ${port}.`));
});
