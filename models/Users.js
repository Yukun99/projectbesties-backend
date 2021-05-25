import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
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
    },
    posts: {
        type: Array
    },
    testResults: {
        type: Array
    },
    swiped: {
        type: Array
    },
    matches: {
        type: Array
    }
});

export default mongoose.model('users', userSchema);
