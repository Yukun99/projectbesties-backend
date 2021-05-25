import mongoose from 'mongoose';

const chatSchema = mongoose.Schema({
    from: {
        type: String,
        required: true
    },
    to: {
        type: String,
        required: true
    },
    messages: {
        type: [[String, Date]]
    }
});

export default mongoose.model('chats', chatSchema);
