import mongoose from 'mongoose';






// Define a schema for the User model which is a blueprint for the data we want to store in MongoDB database
const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        select : false,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        required: true,
    },
});


// Define a model for the User schema where name of the model is 'User' and it will use the schema defined above
export const User = mongoose.model('User', schema);

