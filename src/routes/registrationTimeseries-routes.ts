
// import { countryController } from '../controllers/country.controller';
import express, { Router } from "express";
import { RegistrationTimeseriesController } from "../controllers/registrationTimeseries.controller";
import authMiddleware from "../middleware/auth";

const timeseriesRouter: Router = express.Router();

timeseriesRouter.get('/', RegistrationTimeseriesController.getRegistrationTimeseriesData);
timeseriesRouter.post('/today/individual/', authMiddleware, RegistrationTimeseriesController.updateTodaysRegistrationTimeseriesData);
timeseriesRouter.post('/today/group/', authMiddleware, RegistrationTimeseriesController.updateTodaysRegistrationTimeseriesData);
timeseriesRouter.post('/overwrite/individual', authMiddleware, RegistrationTimeseriesController.updatesAllRegistrationTimeseriesData);
timeseriesRouter.post('/overwrite/group', authMiddleware, RegistrationTimeseriesController.updatesAllRegistrationTimeseriesData);

export default timeseriesRouter;
