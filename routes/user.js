import express from 'express';
import { FetchAllUsers , getMyProfile , DynamicFetchUser, CreateUsers ,LoginUser ,logout } from '../controllers/user.js';
import { isAuthenticated } from '../middleware/auth.js';
import { get } from 'mongoose';

const router = express.Router();

// --------------------------------- Express Routes ---------------------------------

// Define a route handler for the /users route
router.get("/all", FetchAllUsers )


router.post("/create", CreateUsers);
router.post("/login", LoginUser);
router.get("/logout", logout);

router.get("/me",isAuthenticated,getMyProfile);

// Dynamic route parameter.The :id part is a route parameter, which means it can be any value and will be accessible in the request object. 
router.route("/:id").get(DynamicFetchUser);

export default router;