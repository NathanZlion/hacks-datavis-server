import { Request, Response } from "express";
import registrationtimeseries from "../models/registrationTimeSeries.model";

interface RegistrationTimeseriesData {
    date: Date;
    individual: number;
    group: number;
    groupCount: number;
}

export class RegistrationTimeseriesController {
    static async getRegistrationTimeseriesData(req: Request, res: Response) {
        try {
            // Get and validate start and end dates
            const { startDate, endDate } = await RegistrationTimeseriesController.validateDates(req.query);

            // Fetch data from database
            const data = await registrationtimeseries
                .find({ date: { $gte: startDate, $lte: endDate } })
                .sort({ date: 1 })
                .select("date individual group groupCount");

            return res.status(200).json({
                message: "success",
                data,
                startDate,
                endDate,
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                message: "An error occurred during registration timeseries data fetch",
            });
        }
    }

    static async updateTodaysRegistrationTimeseriesData(req: Request, res: Response) {
        try {
            const { individual, group, groupCount } = req.body as RegistrationTimeseriesData;
            const isIndividual = req.path.includes("individual");
            const currentDate = RegistrationTimeseriesController.getCleanedDate();

            const existingData = await registrationtimeseries.findOne({ date: currentDate });

            if (existingData) {
                const updateData = isIndividual ? { individual } : { group, groupCount };
                await registrationtimeseries.updateOne({ date: currentDate }, { $set: updateData });

                return res.status(200).json({
                    message: "success",
                    data: { date: currentDate, individual, group, groupCount },
                });
            }

            const newData = new registrationtimeseries({
                date: currentDate,
                individual,
                group,
                groupCount,
            });

            await newData.save();

            return res.status(200).json({ message: "success", data: newData });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                message: "An error occurred during registration timeseries data update",
            });
        }
    }

    static async updatesAllRegistrationTimeseriesData(req: Request, res: Response) {
        try {
            const dataList = req.body.data as RegistrationTimeseriesData[];
            console.log(dataList)

            if (!dataList || dataList.length === 0) {
                return res.status(400).json({ message: "No data provided" });
            }

            const isIndividual = req.path.includes("individual");
            for (const data of dataList) {
                console.log(data);
                await RegistrationTimeseriesController.updateData(data, isIndividual);
            }

            return res.status(201).json({ message: "All registration timeseries data updated successfully" });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                message: "An error occurred during registration timeseries data update",
            });
        }
    }

    private static async updateData(data: RegistrationTimeseriesData, isIndividual: boolean) {
        const existingData = await registrationtimeseries.findOne({ date: data.date });

        if (existingData) {
            const updateData = isIndividual ? { individual: data.individual } : { group: data.group, groupCount: data.groupCount };
            await registrationtimeseries.updateOne({ date: data.date }, { $set: updateData });
        } else {
            const newData = new registrationtimeseries({ ...data });
            await newData.save();
        }
    }

    private static async validateDates(query: any) {
        var startDate = new Date(query.startDate as string);
        var endDate = new Date(query.endDate as string);

        if (isNaN(startDate.getTime())) {
            startDate = RegistrationTimeseriesController.getCleanedDate(new Date("1970-01-01T00:00:00.000Z"));
        }
        if (isNaN(endDate.getTime())) {
            endDate = RegistrationTimeseriesController.getCleanedDate(new Date("2100-01-01T00:00:00.000Z"));
        }

        return { startDate, endDate };
    }

    private static getCleanedDate(date = new Date()) {
        const cleanedDate = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
        return cleanedDate;
    }
}
