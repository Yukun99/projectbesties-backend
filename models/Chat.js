import mongoose from 'mongoose';

const chatSchema = mongoose.Schema({
    members: {
      type: [String],
      required: true,
    },
  },
  {timestamps: true});

export default mongoose.model('chats', chatSchema);
