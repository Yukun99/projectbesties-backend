import mongoose from 'mongoose';

const cardSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    url: String
});

export default mongoose.model('cards', cardSchema);
