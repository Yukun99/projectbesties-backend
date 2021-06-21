import express from 'express';
import User from '../models/User.js';

const router = express.Router();

// create new user
router.post('/', async (req, res) => {
  const user = new User(req.body);
  try {
    console.log('Creating new user...');
    const saved = await user.save();
    console.log('New user created.');
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json(err.message);
  }
});

// fetch all users
router.get('/', async (req, res) => {
  try {
    console.log('Fetching users...');
    const users = await User.find();
    console.log('All users fetched.');
    res.status(201).json(users);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// fetch user by email
router.get('/:email', async (req, res) => {
  try {
    console.log('Fetching user...');
    const users = await User.findOne({
      email: req.params.email,
    });
    console.log('Matching user found.');
    res.status(201).json(users);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

// update user by id
router.put('/:id', async (req, res) => {
  try {
    console.log('Updating user...');
    const updatedUser = await User.findByIdAndUpdate(req.body._id, req.body);
    console.log('User updated.');
    res.status(204).json(updatedUser);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

export default router;
