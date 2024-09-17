import {User} from '../models/user.js';
import jwt from 'jsonwebtoken';

export const isAuthenticated = async (req, res, next) => {
    const {token} = req.cookies;
    console.log(token);
    if(!token){
        return res.status(401).send({
            success: false,
            message: "Login first"
        })
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded._id);

    // res.status(200).json({
    //     success: true,
    //     user: req.user
    // })
    next();
}

