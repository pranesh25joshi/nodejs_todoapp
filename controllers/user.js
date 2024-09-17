import { User } from '../models/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { sendCookie } from '../utils/features.js';
import ErrorHandler from '../middleware/error.js';
export const FetchAllUsers = async (req, res, next) => {
    try {
        // Fetch all the users from the MongoDB database
        const users = await User.find({});
        console.log(req.query.category);

        res.json({
            success: true,
            users: users
        });
    } catch (error) {
        next(error); // Pass the error to the error handling middleware
    }
};

export const getMyProfile = (req, res, next) => {
    try {
        res.send({
            success: true,
            user: req.user
        });
    } catch (error) {
        next(error); // Pass the error to the error handling middleware
    }
};

export const DynamicFetchUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        console.log(user);
        res.json({
            success: true,
            user: user
        });
    } catch (error) {
        next(error); // Pass the error to the error handling middleware
    }
};


export const CreateUsers = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        let user = await User.findOne({ email: email });

        if (user) {
            return next(new ErrorHandler("User Already Existed!", 404));
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        user = await User.create({
            name: name,
            email: email,
            password: hashedPassword
        });

        sendCookie(user, res, "User created successfully", 201);
    } catch (error) {
        next(error); // Pass the error to the error handling middleware
    }
};

export const LoginUser = async (req, res, next) => {
    try {
        console.log(req.body);
        const { email, password } = req.body;

        // Debugging: Log the email and password
        console.log('Login attempt with email:', email);

        // Find the user by email and include the password field
        const user = await User.findOne({ email }).select("+password");

        console.log('User:', user);
        if (!user) {
            return next(new ErrorHandler("Invalid Credentials", 404));
        }

        // Compare the provided password with the stored hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return next(new ErrorHandler("Invalid Credentials", 404));
        }

        // Debugging: Log the user ID
        console.log('User ID:', user._id);

        // Send the cookie with the user information
        sendCookie(user, res, `Welcome back ${user.name}`, 200);
    } catch (error) {
        next(error); // Pass the error to the error handling middleware
    }
};

export const logout = (req, res, next) => {
    try {
        res.status(200).cookie("token", "", { 
            expires: new Date(Date.now()),
            sameSite : process.env.NODE_ENV === "Development" ? "lax" : "none",
            secure : process.env.NODE_ENV === "Development" ? false : true,
        }).send({
            success: true,
            user: req.user,
            message: "Logged out successfully"
        });
    } catch (error) {
        next(error); // Pass the error to the error handling middleware
    }
};