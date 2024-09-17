import mongoose from 'mongoose';

// Define a schema for the User model which is a blueprint for the data we want to store in MongoDB database
const schema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    discription: {
        type: String,
        required: true,
    },
    isCompleted: {
        type: Boolean,
        default: false,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});


// Define a model for the User schema where name of the model is 'User' and it will use the schema defined above
export const Task = mongoose.model('Task', schema);

