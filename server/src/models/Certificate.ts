import mongoose, { Schema, Document } from "mongoose";

export interface ICertificate extends Document {
  title: string;
  issuer: string;
  date: string;
  verificationLink: string;
  iconName: string;
}

const CertificateSchema = new Schema<ICertificate>(
  {
    title: { type: String, required: true, trim: true },
    issuer: { type: String, required: true, trim: true },
    date: { type: String, required: true },
    verificationLink: { type: String, default: "" },
    iconName: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.models.Certificate || mongoose.model<ICertificate>("Certificate", CertificateSchema);
