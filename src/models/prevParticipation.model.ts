import mongoose, { Document } from "mongoose";

export interface prevParticipationDocument extends Document {
    individualYes: number,
    individualNo: number,
    groupYes: number,
    groupNo: number,
    createdAt: Date;
    updatedAt: Date;
}

const prevParticipationSchema = new mongoose.Schema({
    individualYes: { type: Number, default: 0 },
    individualNo: { type: Number, default: 0 },
    groupYes: { type: Number, default: 0 },
    groupNo: { type: Number, default: 0 },
}, { timestamps: true });

const prevParticipation = mongoose.model<prevParticipationDocument>("prevParticipation", prevParticipationSchema);
export default prevParticipation;