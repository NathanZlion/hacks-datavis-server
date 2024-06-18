import Express, { Router, Request, Response } from "express";
import authMiddleware from "../middleware/auth";
import { prevParticipationControllers } from "../controllers/prevParticipation.controller";


const prevParticipationRouter: Router = Express.Router();

prevParticipationRouter.get("/", prevParticipationControllers.getPrevParticipation);
prevParticipationRouter.post("/overwrite/individual", authMiddleware, prevParticipationControllers.overwriteIndividualPrevRegistration);
prevParticipationRouter.post("/overwrite/group", authMiddleware, prevParticipationControllers.overwriteGroupPrevRegistration);


export default prevParticipationRouter;