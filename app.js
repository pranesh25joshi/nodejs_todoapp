import express from 'express';
import UserRouter from  './routes/user.js';
import TaskRouter from './routes/task.js';
import {config} from 'dotenv';
import cookieParser from 'cookie-parser';
import { errorMiddleware } from './middleware/error.js';
import cors from 'cors';


// Create an express application
export const app = express();

config({
    path: "./data/config.env",
});

// Use the express.json() middleware to parse the request body of the incoming HTTP POST request
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:[ process.env.FRONTEND_URL],
    methods: ["GET","POST","PUT","DELETE"],
    credentials: true,
    // credentials are set to true to allow the frontend to send cookies to the backend otherwise the cookies will not be sent to the backend
}));

app.use("/api/v1/user",UserRouter);
app.use("/api/v1/task",TaskRouter);

app.use(errorMiddleware);

app.get("/", (req,res) => {
    res.send("Hello World");
});

