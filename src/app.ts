import { Request, Response, NextFunction, Express } from "express";
import { version } from "./constants";
import mongoose from "mongoose";
import express from "express";
import cors from "cors"
import { config as configDotenv } from "dotenv";


import participantRouter from "./routes/participant.routes";
import reachoutRouter from "./routes/reachout.routes";
import countryRouter from "./routes/country.routes";
import summaryRouter from "./routes/summary.routes";
import prevParticipationRouter from "./routes/prevParticipation.router";

configDotenv();

const app: Express = express();

// MIDDLEWARES, PARSERS TO USE JSON
app.use(express.json());

// SET HEADERS
app.use((_: Request, res: Response, next: NextFunction) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Authorization, Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
    next();
});

const base_api = '/api/v'+version; 

// ROUTES

// test route
app.get(base_api+"/ping", (req: Request, res: Response) => {
    console.log(req.ip);
    res.json({ 
        status: "success",
        message: "pong",
    });
});

app.use(base_api+"/participant", participantRouter);
app.use(base_api+"/reachout", reachoutRouter);
app.use(base_api+"/summary", summaryRouter);
app.use(base_api+"/country", countryRouter);
app.use(base_api+"/prevparticipation", prevParticipationRouter);

// any origin can access this server
app.use(cors({
    origin: "*",
}));

mongoose.set('strictQuery', false);

async function connectToDb() {
    try {
        console.log(`trying to Connect to database...`);
        await mongoose.connect(
            process.env.MONGODB_CONNECTION_STRING!,
            { useNewUrlParser: true, useUnifiedTopology: true } as mongoose.ConnectOptions
        );
        console.log(`✔ Connected to database successfully`);
    } catch (error: any) {
        throw new Error(`Database Error: ${error.message}`);
    }
}

async function startListening() {
    try {
        const PORT = process.env.PORT || 3000;
        console.log(`trying to open port ${PORT}...`);
        app.listen(PORT);
        console.log(`✔ Server listening through port ${PORT}`);
    } catch (error: any) {
        throw new Error(error.message);
    }
}

async function startServer() {
    try {
        await connectToDb();
        await startListening();
        console.warn(`-- ✔ Server started successfully ✔ --`);
    } catch (error: any) {
        console.log(error.message);
    }
}


startServer();
