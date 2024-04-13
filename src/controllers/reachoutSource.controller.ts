import { Request, Response } from 'express';
import reachoutSource from '../models/reachoutSource.model';

interface reachoutSourceInterface {
    reachoutSourceName: string;
    numberOfParticipants: number;
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
            const reachoutSourceStat = req.body.data as reachoutSourceInterface[] || null;
            await reachoutSource.deleteMany();

            reachoutSourceStat.forEach(async (countryStat) => {
                await new reachoutSource(countryStat).save();
            });

            res.status(200)
                .json({
                    status: "success",
                    message: "Successfully over written reachout sources stat!",
                });
        }
        catch (error) {
            res.status(500).json({ "message": "Some thing went wrong!" });
        }
    }
}