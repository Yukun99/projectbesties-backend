import mongoose from 'mongoose';

const msgSchema = mongoose.Schema({
    message: {
      type: String,
      required: true,
    },
    senderID: {
      type: String,
      required: true,
    },
    chatID: {
      type: String,
      required: true,
    },
  },
  {timestamps: true});

export default mongoose.model('messages', msgSchema);
