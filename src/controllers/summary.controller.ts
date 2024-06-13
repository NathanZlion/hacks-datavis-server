import { Request, Response } from 'express';
import summary from '../models/summary.model';
import country from '../models/country.model';


/**
 * Class summary controller: has functions to run when request is called.
 */
export class SummaryController {

    /** 
     * @param {*} _ the request which is not needed
     * @param {*} res
     * @returns a summary if it is found in the database, else it will return not found
    */
    static async getSummary (_: Request, res: Response) {
        try {
            const storedSummary = await summary.findOne();
            if (!storedSummary) {
                res.status(400).json({ message: "Summary not found!" });
                return;
            }
            
            const individualParticipants = storedSummary.individualParticipants;
            const numberofTeams = storedSummary.groupParticipants;
            const averageGroupSize = storedSummary.averageGroupSize;
            const totalParticipants = Math.round(numberofTeams * averageGroupSize) + individualParticipants;

            res.status(200)
                .json({
                    message: "success",
                    data: {
                        "totalParticipants": totalParticipants,
                        "individualParticipants": individualParticipants,
                        "groupParticipants": numberofTeams,
                        "countryCount": await country.countDocuments(),
                    },
                });
        }
        catch (error) {
            res.status(500).json({
                "message": "Some thing went wrong!"
            });
        }
    }


    /** 
     * @param {*} req 
     * @param {*} res
     * @returns This will post the summary patch 
    */
    static async writeSummary (req: Request, res: Response) {
        try {
            const {individualParticipants, groupParticipants, averageGroupSize} = req.body;

            const storedSummary = await summary.findOne();

            // If the write summary request is from team, then the request body would has individualParticipants attribute
            // is individual sheet request
            if (individualParticipants) {
                storedSummary!.individualParticipants = individualParticipants;
            } else {
                storedSummary!.groupParticipants = groupParticipants;
                storedSummary!.averageGroupSize = averageGroupSize;
            }

            // save updated summary
            await storedSummary!.save();
            
            res.status(200)
                .json({
                    message: "success",
                    data: storedSummary,
                });
        }
        catch (error) {
            res.status(500).json({
                "message": "Some thing went wrong!"
            });
        }
    }

    static async getIndividualsCount (_: Request, res: Response) {
        try {
            const storedSummary = await summary.findOne();
            if (!storedSummary) {
                res.status(400).json({ message: "Individual Participants count not found!" });
                return;
            }

            res.status(200)
                .json({
                    message: "success",
                    data: storedSummary.individualParticipants,
                });
        }
        catch (error) {
            res.status(500).json({
                "message": "Some thing went wrong!"
            });
        }
    }

    
    static async getGroupsCount (_: Request, res: Response) {
        try {
            const storedSummary = await summary.findOne();
            if (!storedSummary) {
                res.status(400).json({ message: "Group participants count not found!" });
                return;
            }

            res.status(200)
                .json({
                    message: "success",
                    data: storedSummary.groupParticipants,
                });
        }
        catch (error) {
            res.status(500).json({
                "message": "Some thing went wrong!"
            });
        }

    }

    static async getCountriesCount (_: Request, res: Response) {
        try {
            // count the number of countries from country database
            const countryCount = await country.countDocuments();

            res.status(200)
                .json({
                    message: "success",
                    data: countryCount,
                });
        }
        catch (error) {
            res.status(500).json({
                "message": "Some thing went wrong!"
            });
        }
    }
}