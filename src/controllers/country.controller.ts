import { Request, Response } from 'express';
import country from '../models/country.model';


interface countryStatInterface {
    countryName: string;
    numberOfIndividualParticipants?: number;
    numberOfGroupParticipants?: number;
}

/**
 * Class summary controller: has functions to run when request is called.
 */
export class countryController {

    static async getCountryStat (_: Request, res: Response) {
        try {
            const countriesStat = await country.find();

            res.status(200)
                .json({
                    message: "success",
                    data: countriesStat,
                });
        }
        catch (error) {
            res.status(500).json({
                status: "error",
                message: "Some thing went wrong!"
            });
        }
    }

    
    static async overwriteCountriesStat (req: Request, res: Response) {
        try {
            const countriesStat = req.body.data as countryStatInterface[];
            // await country.deleteMany();

            countriesStat.forEach(async (countryStat) => {

                // check if the country already exists
                const countryExists = await country.findOne({ countryName: countryStat.countryName }) as any;

                if (!countryExists) {
                    await new country(countryStat).save();
                    return;
                }

                // check if this overwrite is from individual registration or not, in order not to make
                // individual tracker sheet overwrite data for group tracker sheet and vice versa.
                await countryExists.save();
                if (countryStat.numberOfIndividualParticipants) {
                    countryExists.numberOfIndividualParticipants = countryStat.numberOfIndividualParticipants;
                } else if (countryStat.numberOfGroupParticipants) {
                    countryExists.numberOfGroupParticipants = countryStat.numberOfGroupParticipants;
                }

                // save changes
                await countryExists.save();
            });


            res.status(200)
                .json({
                    status: "success",
                    message: "Successfully created countries stat!",
                });
        }
        catch (error) {
            res.status(500).json({ "message": "Some thing went wrong!" });
        }
    }
}