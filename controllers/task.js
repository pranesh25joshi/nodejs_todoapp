import {Task} from '../models/task.js';
import ErrorHandler from '../middleware/error.js';
export const newTask = async (req, res, next) => {
    try {
        const { title, description } = req.body;
        await Task.create({
            title: title,
            description: description,
            user: req.user,
        });

        res.status(201).json({
            success: true,
            message: "Task created"
        });
    } catch (error) {
        next(error); // Pass the error to the error handling middleware
    }
};
export const myTask = async (req, res, next) => {
    try {
        console.log(req.user);
        const user_id = req.user._id;
        const tasks = await Task.find({ user: user_id });
        // tasks is an array of objects containing the tasks created by the user

        res.status(200).json({
            success: true,
            tasks: tasks
        });
    } catch (error) {
        next(error); // Pass the error to the error handling middleware
    }
};

export const updateTask = async (req, res, next) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) return next(new ErrorHandler("Task not found, Invalid Task Id", 404));

        task.isCompleted = !task.isCompleted;
        await task.save();
        
        res.status(200).json({
            success: true,
            message: "Task updated!!"
        });
    } catch (error) {
        next(error); // Pass the error to the error handling middleware
    }
};

export const deleteTask = async (req, res, next) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) return next(new ErrorHandler("Task not found, Invalid Task Id", 404));

        await task.deleteOne();

        res.status(200).json({
            success: true,
            message: "Task deleted!!"
        });
    } catch (error) {
        next(error); // Pass the error to the error handling middleware
    }
};