import mongoose, { Document } from "mongoose";

export interface reachoutSourceDocument extends Document {
    reachoutSourceName: String,
    numberOfParticipants: number,
    createdAt: Date;
    updatedAt: Date;
}

const reachoutSourceSchema = new mongoose.Schema({
    reachoutSourceName: { type: String, required: [true, "Reachout source name is required"], unique: true },
    numberOfParticipants: { type: Number, default: 1 }
}, { timestamps: true });

const reachoutSource = mongoose.model<reachoutSourceDocument>("reachoutSource", reachoutSourceSchema);
export default reachoutSource;