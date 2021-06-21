import express from 'express';
import Chat from '../models/Chat.js';

const router = express.Router();

// create new chat
router.post('/', async (req, res) => {
  const chat = new Chat(req.body);
  try {
    console.log('Creating new chat...');
    const saved = await chat.save();
    console.log('New chat created.');
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json(err.message);
  }
});

// get all chat by single user ID
router.get('/:user', async (req, res) => {
  try {
    console.log('Fetching chats...');
    const chats = await Chat.find({
      members: {$in: [req.params.user]},
    });
    console.log('Matching chats found.');
    res.status(200).json(chats);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get chat between two user IDs
router.get('/find/:first/:second', async (req, res) => {
  try {
    console.log('Fetching chat...');
    const chat = await Chat.findOne({
      members: {$all: [req.params.first, req.params.second]},
    });
    console.log('Matching chat found.');
    res.status(200).json(chat);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
