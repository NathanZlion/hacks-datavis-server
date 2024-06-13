import country from "../models/country.model";
import reachoutSource from "../models/reachoutSource.model";
import { Request, Response } from "express";
import summary from "../models/summary.model";


interface groupRegistrationInterface {
    countryName: string;
    reachoutSource: string;
    groupSize: number;
}

interface individualRegistrationInterface {
    countryName: string;
    reachoutSource: string;
}


/**
 * 
 * A class to handle all new user registration related controllers 
 */
export class participantControllers {

    static async newIndividualRegistration(req: Request, res: Response) {
        try {
            const { countryName, reachoutSource } = req.body as individualRegistrationInterface;
    
            // incremenet individual participants count by one
            await participantControllers._incrementIndividualParticipantsCount();

            // update country and reachoutSource
            await participantControllers._increaseCountrySourceCount(countryName, 1, true);
    
            // update the reachoutSource
            await participantControllers._incrementreachoutSourceCount(reachoutSource, 1, true);

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
            const { countryName, reachoutSource, groupSize } = req.body as groupRegistrationInterface;

            // increment group participants count by one
            await participantControllers._incrementGroupParticipantsCount(groupSize);

            // update country and reachoutSource
            await participantControllers._increaseCountrySourceCount(countryName, groupSize, false);

            // update the reachoutSource
            await participantControllers._incrementreachoutSourceCount(reachoutSource, groupSize, false);

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
    
    static async _increaseCountrySourceCount(countryName: string, increment: number = 1, individual: boolean = true) {
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
    
    static async _incrementreachoutSourceCount(reachoutSourceName: string, increment: number = 1, individual: boolean = true) {
        // find the reachout source
        const existingReachoutSource = await reachoutSource.findOne({ reachoutSourceName: reachoutSourceName });

        // if the reachout source is not found, create a new one
        if (!existingReachoutSource) {
            await new reachoutSource({ reachoutSourceName: reachoutSourceName }).save();
            return;
        }

        // update the reachout source count
        if (individual) {
            existingReachoutSource.numberOfIndividualParticipants += increment;
        } else {
            existingReachoutSource.numberOfGroupParticipants += increment;
        }

        // save the updated reachout source 
        await existingReachoutSource.save();

        return;
    }

    static async _incrementIndividualParticipantsCount () {
        const _summary = await summary.findOne();
        _summary!.individualParticipants++;

        await _summary!.save();
        return;
    }

    static async _incrementGroupParticipantsCount (groupSize: number) {
        const _summary = await summary.findOne();
        const originalGroupParticipants = _summary!.groupParticipants;
        const numberOfParticipants =_summary!.groupParticipants * _summary!.averageGroupSize;

        _summary!.averageGroupSize = (numberOfParticipants + groupSize) / (originalGroupParticipants + 1);
        _summary!.groupParticipants++;

        await _summary!.save();
        return;
    }
}