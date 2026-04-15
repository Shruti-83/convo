import express from "express";
import { protectRoute } from "../src/middlewares/protectRoute.js";
import { createSession, endSession, getActiveSessions, getMyRecentSessions, getSessionById, joinSession } from "../src/controllers/sessionController.js";

export const sessionRouter = express.Router()

sessionRouter.post("/",protectRoute, createSession)
sessionRouter.get("/active", ...protectRoute, getActiveSessions);
sessionRouter.get("/my-recent", ...protectRoute, getMyRecentSessions);

sessionRouter.get("/:id",protectRoute, getSessionById)
sessionRouter.post("/:id/join",protectRoute, joinSession)
sessionRouter.post("/:id/end",protectRoute, endSession)



