
import express from "express";
import { participantControllers } from "../controllers/participant.controller";
import authMiddleware from "../middleware/auth";

const participantRouter = express.Router();


participantRouter.use(authMiddleware);

participantRouter.post("/new/individual", participantControllers.newIndividualRegistration);
participantRouter.post("/new/group", participantControllers.newGroupRegistration);

export default participantRouter;