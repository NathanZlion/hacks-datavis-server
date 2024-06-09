import country from "../models/country.model";
import reachoutSource from "../models/reachoutSource.model";
import { Request, Response } from "express";


interface groupRegistrationInterface {
    countryName: string;
    reachoutsource: string;
    groupSize: number;
}

interface individualRegistrationInterface {
    countryName: string;
    reachoutSource: string;
}


/**
 * 
 * A class to handle all user related controllers 
 */
export class participantControllers {

    static async newIndividualRegistration(req: Request, res: Response) {
        try {
            const { countryName, reachoutSource } = req.body as individualRegistrationInterface;
    
            // update country and reachoutSource
            await participantControllers.increaseCountrySourceCount(countryName, 1, true);
    
            // update the reachoutSource
            await participantControllers.addOnereachoutSource(reachoutSource);

            return res.status(200).json({
                status: "success",
                message: "Successfully registered a new individual!"
            });
        } catch (error) {
            res.status(500).json({
                message: "Something went wrong!", error: error
            });
        }
    }

    static async newGroupRegistration(req: Request, res: Response) {
        try {
            const { countryName, reachoutsource, groupSize } = req.body as groupRegistrationInterface;

            // update country and reachoutSource
            await participantControllers.increaseCountrySourceCount(countryName, groupSize, false);
    
            // update the reachoutSource
            await participantControllers.addOnereachoutSource(reachoutsource, groupSize);

            return res.status(200).json({
                status: "success",
                message: "Successfully registered a new group!"
            });
        } catch (error) {
            res.status(500).json({
                message: "Something went wrong!", error: error
            });
        }
    }
    
    static async increaseCountrySourceCount(countryName: string, increment: number = 1, individual: boolean = true) {
        // find the country
        const existingCountry = await country.findOne({ countryName: countryName });

        // if the country is not found, create a new one
        if (!existingCountry) {
            await new country({ countryName: countryName }).save();
            return;
        }

        // update the country count
        if (individual) {
            existingCountry.numberOfIndividualParticipants += increment;
        } else {
            existingCountry.numberOfGroupParticipants += increment;
        }
        
        // save the updated country
        await existingCountry.save();
        
        return;
    }
    
    static async addOnereachoutSource(reachoutSourceName: string, increment: number = 1) {
        // find the reachout source
        const existingReachoutSource = await reachoutSource.findOne({ reachoutSourceName: reachoutSourceName });

        // if the reachout source is not found, create a new one
        if (!existingReachoutSource) {
            await new reachoutSource({ reachoutSourceName: reachoutSourceName }).save();
            return;
        }

        // update the reachout source count
        existingReachoutSource.numberOfParticipants += increment;

        // save the updated reachout source 
        await existingReachoutSource.save();

        return;
    }
}