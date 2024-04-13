import mongoose, { Document } from "mongoose";

export interface countryDocument extends Document {
    countryName: String,
    numberOfParticipants: number,
    createdAt: Date;
    updatedAt: Date;
}

const countrySchema = new mongoose.Schema({
    countryName: { type: String, required: [true, "Country Name is required"], unique: true },
    numberOfParticipants: { type: Number, unique: true, default: 1 }
}, { timestamps: true });

const country = mongoose.model<countryDocument>("country", countrySchema);
export default country;