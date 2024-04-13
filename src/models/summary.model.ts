import mongoose, { Document } from "mongoose";

export interface summaryDocument extends Document {
    totalParticipants: Number;
    individualParticipants: Number;
    groupParticipants: Number;
    totalCountries: Number;
    updatedAt: Date;
}

const summarySchema = new mongoose.Schema({
    totalParticipants: { type: Number, required: true },
    individualParticipants: { type: Number, required: true },
    groupParticipants: { type: Number, required: true },
    totalCountries: { type: Number, required: true },
}, { timestamps: true });

const summary = mongoose.model<summaryDocument>("summary", summarySchema);
export default summary;