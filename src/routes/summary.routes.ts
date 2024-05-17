

import { SummaryController } from '../controllers/summary.controller';
import express, { Router } from "express";
import authMiddleware from "../middleware/auth";

const summaryRouter: Router = express.Router();

// auth middleware to authenticated the user
// summaryRouter.use(authMiddleware);

// Updating content requires authentication
summaryRouter.post("/", authMiddleware, SummaryController.writeSummary);

summaryRouter.get("/", SummaryController.getSummary);

summaryRouter.get("/total_participants", SummaryController.getTotalParticipants);
summaryRouter.get("/individuals", SummaryController.getIndividualsCount);
summaryRouter.get("/groups", SummaryController.getGroupsCount);
summaryRouter.get("/countries", SummaryController.getCountriesCount);
summaryRouter.get("/", SummaryController.getSummary);

export default summaryRouter;