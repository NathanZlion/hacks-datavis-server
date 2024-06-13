import { Request, Response } from 'express';
import reachoutSource from '../models/reachoutSource.model';
import { isIn } from 'validator';

interface reachoutSourceInterface {
    reachoutSourceName: string;
    numberOfIndividualParticipants: number,
    numberOfGroupParticipants: number,
}

export class ReachoutSourceController {

    static async getReachoutSourceStat (_: Request, res: Response) {
        try {
            const reachoutSourcesStat = await reachoutSource.find();

            res.status(200)
                .json({
                    message: "success",
                    data: reachoutSourcesStat,
                });
        }
        catch (error) {
            res.status(500).json({
                status: "error",
                message: "Some thing went wrong!"
            });
        }
    }
    
    static async overwriteReachoutSourceStat (req: Request, res: Response) {
        try {
            const reachoutSourceStat = req.body.data as reachoutSourceInterface[];

            // the request is coming from an individual registration google sheet
            reachoutSourceStat.forEach(async (reachoutStat) => {
                // individual registration
                if (isIn("numberOfIndividualParticipants", Object.keys(reachoutStat))) {
                    console.log(reachoutStat)
                    const reachoutSourceStat = await reachoutSource.findOne({ reachoutSourceName: reachoutStat.reachoutSourceName });
                    if (reachoutSourceStat) {
                        reachoutSourceStat.numberOfIndividualParticipants = reachoutStat.numberOfIndividualParticipants;
                        reachoutSourceStat.save();
                    } else {
                        new reachoutSource(reachoutStat).save();
                    }
                } else {
                    const reachoutSourceStat = await reachoutSource.findOne({ reachoutSourceName: reachoutStat.reachoutSourceName });
                    console.log(reachoutStat);
                    if (reachoutSourceStat) {
                        reachoutSourceStat.numberOfGroupParticipants = reachoutStat.numberOfGroupParticipants;
                        reachoutSourceStat.save();
                    } else {
                        new reachoutSource(reachoutStat).save();
                    }
                }
            });

            res.status(200)
                .json({
                    status: "success",
                    message: "Successfully overwritten reachout sources stat!",
                });
        }
        catch (error) {
            res.status(500).json({ "message": "Some thing went wrong!" });
        }
    }
}