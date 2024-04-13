import { countryController } from '../controllers/country.controller';
import express, { Router } from "express";
import authMiddleware from "../middleware/auth";

const countryRouter: Router = express.Router();

// auth middleware to authenticated the user
// summaryRouter.use(authMiddleware);

// Updating content requires authentication
countryRouter.get('/', countryController.getCountryStat);

// flush all the data and write new data
// Used for routine update of the data
countryRouter.post("/", authMiddleware, countryController.overwriteCountriesStat);

export default countryRouter;
