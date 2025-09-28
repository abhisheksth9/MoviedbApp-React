import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import { getUserData } from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.get('/data', authMiddleware, getUserData);

export default userRouter;