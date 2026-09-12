import mongoose from "mongoose";

const bikeRegistrationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    serialNumber: { type: String, required: true, unique: true, trim: true },
    bikeName: { type: String, required: true, trim: true },
    modelYear: { type: Number, min: 1900 },
    purchaseDate: { type: Date },
    purchaseLocation: { type: String, trim: true, default: "" },
  },
  { timestamps: true },
);

export const BikeRegistration =
  mongoose.models.BikeRegistration ??
  mongoose.model("BikeRegistration", bikeRegistrationSchema);

export default BikeRegistration;
