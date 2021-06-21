import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    imgUrl: String,
    projects: {
      type: Array,
    },
    posts: {
      type: Array,
    },
    testResults: {
      type: String,
    },
    swiped: {
      type: Array,
    },
    matches: {
      type: Array,
    },
  },
  {timestamps: true});

export default mongoose.model('users', userSchema);
