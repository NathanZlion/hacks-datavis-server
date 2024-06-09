import mongoose, { Document } from "mongoose";

export interface countryDocument extends Document {
    countryName: String,
    numberOfIndividualParticipants: number,
    numberOfGroupParticipants: number,
    createdAt: Date;
    updatedAt: Date;
}

const countrySchema = new mongoose.Schema({
    countryName: { type: String, required: [true, "Country Name is required"], unique: true },
    numberOfIndividualParticipants: { type: Number, default: 0 },
    numberOfGroupParticipants: { type: Number, default: 0 }
}, { timestamps: true });

const country = mongoose.model<countryDocument>("country", countrySchema);
export default country;