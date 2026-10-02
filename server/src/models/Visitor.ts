import mongoose, { Schema, Document } from "mongoose";

export interface IVisitor extends Document {
  ipAddress: string;
  deviceType: string;
  browser: string;
  country: string;
  timestamp: Date;
}

const VisitorSchema = new Schema<IVisitor>(
  {
    ipAddress: { type: String, required: true },
    deviceType: { type: String, default: "desktop" },
    browser: { type: String, default: "unknown" },
    country: { type: String, default: "unknown" },
    timestamp: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.models.Visitor || mongoose.model<IVisitor>("Visitor", VisitorSchema);
