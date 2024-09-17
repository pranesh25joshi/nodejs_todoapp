import mongoose from "mongoose";
// --------------------------------- MongoDB Connection ---------------------------------

// Connect to MongoDB database using Mongoose
export const mongodb = () => {
    mongoose.connect(process.env.MONGO_URL,{
        dbName: "backend",
    }).then(() => {
        console.log("MongoDB connected");
    }).catch((err) => {
        console.log(err);
    })
};