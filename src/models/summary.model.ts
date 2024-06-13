import mongoose, { Document } from "mongoose";

export interface summaryDocument extends Document {
    individualParticipants: number;
    groupParticipants: number;
    averageGroupSize: number;
    updatedAt: Date;
}

const summarySchema = new mongoose.Schema({
    individualParticipants: { type: Number, required: true },
    groupParticipants: { type: Number, required: true },
    averageGroupSize: { type: Number, required: true },
}, { timestamps: true });

const summary = mongoose.model<summaryDocument>("summary", summarySchema);
export default summary;