import mongoose, { Document } from "mongoose";

export interface reachoutSourceDocument extends Document {
    reachoutSourceName: String,
    numberOfIndividualParticipants: number,
    numberOfGroupParticipants: number,
    createdAt: Date;
    updatedAt: Date;
}

const reachoutSourceSchema = new mongoose.Schema({
    reachoutSourceName: { type: String, required: [true, "Reachout source name is required"], unique: true },
    numberOfIndividualParticipants: { type: Number, default: 0 },
    numberOfGroupParticipants: { type: Number, default: 0 }
}, { timestamps: true });

const reachoutSource = mongoose.model<reachoutSourceDocument>("reachoutSource", reachoutSourceSchema);
export default reachoutSource;