import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    imgUrl: String,
    creationDate: {
        type: Date,
        required: true
    },
    projects: {
        type: Array
    }
});

export default mongoose.model('users', userSchema);
