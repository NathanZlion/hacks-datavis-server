import { Request, Response } from 'express';
import prevParticipation from '../models/prevParticipation.model';

interface overwriteRequest {
    yes: number,
    no: number,
}


export class prevParticipationControllers {

    static async getPrevParticipation(_: Request, res: Response) {
        try {
            console.log("prev participation  get ")
            const _prevParticipation = await prevParticipation.findOne();

            res.status(200)
                .json({
                    message: "success",
                    data: _prevParticipation,
                });
        }
        catch (error) {
            res.status(500).json({
                status: "error",
                message: "Some thing went wrong!"
            });
        }
    }


    static async _addIndividualPrevParticipation(response: boolean): Promise<boolean> {
        try {
            const _prevParticipation = await prevParticipation.findOne();
            if (response) {
                _prevParticipation!.individualYes++;
            } else {
                _prevParticipation!.individualNo++;
            }

            await _prevParticipation?.save()
            return true;
        }
        catch (error) {
            return false;
        }
    }


    static async _addGroupPrevParticipation(response: boolean): Promise<boolean> {
        try {
            const _prevParticipation = await prevParticipation.findOne();
            if (response) {
                _prevParticipation!.groupYes++;
            } else {
                _prevParticipation!.groupNo++;
            }

            await _prevParticipation?.save()
            return true;
        }
        catch (error) {
            return false;
        }
    }


    static async addPrevParticipation(individual: boolean, response: boolean) : Promise<boolean> {
        if (individual) {
            return await prevParticipationControllers._addIndividualPrevParticipation(response);
        } else {
            return await prevParticipationControllers._addGroupPrevParticipation(response);
        }
    }


    static async overwriteIndividualPrevRegistration(req: Request, res: Response) {
        try {
            const { no, yes } = req.body.data as overwriteRequest;
            
            const _prevParticipation = await prevParticipation.findOne();
            _prevParticipation!.individualNo = no;
            _prevParticipation!.individualYes = yes;
            await _prevParticipation?.save();

            res.status(200)
                .json({
                    message: "success",
                    data: _prevParticipation,
                });
        }
        catch (error) {
            res.status(500).json({
                status: "error",
                message: `Some thing went wrong ! ${error}`
            });
        }
    }


    static async overwriteGroupPrevRegistration(req: Request, res: Response) {
        try {
            const { no, yes } = req.body.data as overwriteRequest;
            const _prevParticipation = await prevParticipation.findOne();
            _prevParticipation!.groupNo = no;
            _prevParticipation!.groupYes = yes;
            await _prevParticipation?.save();

            res.status(200)
                .json({
                    message: "success",
                    data: _prevParticipation,
                });
        }
        catch (error) {
            res.status(500).json({
                status: "error",
                message: "Some thing went wrong!"
            });
        }
    }

}