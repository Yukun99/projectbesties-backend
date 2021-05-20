import express from 'express';
import mongoose from 'mongoose';
import Cors from 'cors';
import Users from './models/Users.js';

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
    res.status(200).send("Hello Alyssa!");
});

app.post('/tinder/users', (req, res) => {
    const dbCard = req.body;

    Users.create(dbCard, (err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(201).send(data);
        }
    });
})

app.get('/tinder/users', (req, res) => {
    Users.find((err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(data);
        }
    });
})

//Listener
app.listen(port, () => {
    console.log((`listening on localhost: ${port}.`))
})
