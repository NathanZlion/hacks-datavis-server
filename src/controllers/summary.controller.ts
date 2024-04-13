import { Request, Response } from 'express';
import summary from '../models/summary.model';


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


    /** 
     * @param {*} req 
     * @param {*} res
     * @returns This will post the summary patch 
    */
    static async writeSummary (req: Request, res: Response) {
        try {
            const {totalParticipants, individualParticipants, groupParticipants, totalCountries} = req.body;

            const storedSummary = await summary.findOne();
            if (!storedSummary) {
                //  writting summary into a clean database
                await new summary({
                    groupParticipants: groupParticipants || 0,
                    totalCountries: totalCountries || 0,
                    totalParticipants: totalParticipants || 0,
                    individualParticipants: individualParticipants || 0,
                }).save();

                res.status(200).json({ message: "New summary written" });
                return;
            }

            storedSummary.groupParticipants = groupParticipants ? groupParticipants : storedSummary.groupParticipants;
            storedSummary.totalCountries = totalCountries ? totalCountries : storedSummary.totalCountries;
            storedSummary.totalParticipants = totalParticipants ? totalParticipants : storedSummary.totalParticipants;
            storedSummary.individualParticipants = individualParticipants ? individualParticipants : storedSummary.individualParticipants;

            // save updated summary
            await storedSummary.save();

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


    static async getTotalParticipants (_: Request, res: Response) {
        try {
            const storedSummary = await summary.findOne();
            if (!storedSummary) {
                res.status(400).json({ message: "Participants not found!" });
                return;
            }

            res.status(200)
                .json({
                    message: "success",
                    data: storedSummary.totalParticipants,
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
            const storedSummary = await summary.findOne();
            if (!storedSummary) {
                res.status(400).json({ message: "Country count not found!" });
                return;
            }

            res.status(200)
                .json({
                    message: "success",
                    data: storedSummary.totalCountries,
                });
        }
        catch (error) {
            res.status(500).json({
                "message": "Some thing went wrong!"
            });
        }
    }
}