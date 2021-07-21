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
    imgBase64: String,
    linkedInUrl: String,
    projects: Array,
    testResults: String,
    swiped: Array,
    matches: Array,
    confirmed: {
      type: Boolean,
      required: true,
    },
    scores: Array,
  },
  {timestamps: true});

export default mongoose.model('users', userSchema);
