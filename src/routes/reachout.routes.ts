import express, { Router } from "express";
import authMiddleware from "../middleware/auth";
import { ReachoutSourceController } from '../controllers/reachoutSource.controller';

const reachoutRouter: Router = express.Router();

// auth middleware to authenticated the user
// reachoutRouter.use(authMiddleware);

reachoutRouter.get("/", ReachoutSourceController.getReachoutSourceStat);
reachoutRouter.post("/", authMiddleware, ReachoutSourceController.overwriteReachoutSourceStat);

export default reachoutRouter;  