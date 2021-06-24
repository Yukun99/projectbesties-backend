import express from 'express';
import Message from '../models/Message.js';

const router = express.Router();

// create a new message
router.post('/', async (req, res) => {
  const msg = new Message(req.body);
  try {
    console.log('Creating new message...');
    const saved = await msg.save();
    console.log('New message created.');
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({message: err.message});
  }
});

// get messages by chatId
router.get('/:chatID', async (req, res) => {
  try {
    console.log('Fetching messages...');
    const messages = await Message.find({
      chatID: req.params.chatID,
    });
    console.log('Matching messages found.');
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
