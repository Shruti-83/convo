import express from 'express'
import { getStreamToken } from '../src/controllers/chatController.js';
import { protectRoute } from '../src/middlewares/protectRoute.js';

export const chatRouter = express.Router();


chatRouter.get("/token",protectRoute,getStreamToken);


