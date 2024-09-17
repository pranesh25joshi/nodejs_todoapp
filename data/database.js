import mongoose from "mongoose";
// --------------------------------- MongoDB Connection ---------------------------------

// Connect to MongoDB database using Mongoose
export const mongodb = () => {
    mongoose.connect(process.env.MONGO_URL,{
        dbName: "backend",
    }).then((c) => {
        console.log(`MongoDB connected with HOST: ${c.connection.host}`);
    }).catch((err) => {
        console.log(err);
    })
};