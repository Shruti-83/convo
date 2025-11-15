import express from 'express'
import { getStreamToken } from '../src/controllers/chatController.js';
import { protectRoute } from '../src/middlewares/protectRoute.js';

const router = express.Router();


router.get("/token",protectRoute,getStreamToken)
export default router;
