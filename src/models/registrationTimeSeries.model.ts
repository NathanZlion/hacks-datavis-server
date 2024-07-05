import mongoose, { Document } from "mongoose";

export interface registrationTimeseriesModel extends Document {
    date: Date;
    individual: number;
    group: number;
    groupCount: number;
    createdAt: Date;
    updatedAt: Date;
}

const registrationTimeseriesSchema = new mongoose.Schema({
    date: { type: Date, required: true, unique: true },
    individual: { type: Number, required: true, default: 0 },
    group: { type: Number, required: true, default: 0 },
    groupCount: { type: Number, required: true, default: 0 },
    total: { type: Number, required: true, default: 0 }
}, { timestamps: true });


const registrationTimeseries = mongoose.model<registrationTimeseriesModel>("registrationTimeseries", registrationTimeseriesSchema);
export default registrationTimeseries;