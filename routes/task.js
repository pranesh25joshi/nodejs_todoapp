import express from 'express';
import { newTask, myTask, updateTask, deleteTask } from '../controllers/task.js';
import { isAuthenticated } from '../middleware/auth.js';

const router = express.Router();

router.post("/new", isAuthenticated, newTask);
router.get("/my", isAuthenticated, myTask);
// router.post("/update", isAuthenticated, updateTask);
router.route("/:id").put(isAuthenticated,updateTask).delete(isAuthenticated,deleteTask);


export default router;