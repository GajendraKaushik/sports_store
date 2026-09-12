import mongoose from "mongoose";

const wheelRegistrationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    serialNumber: { type: String, required: true, unique: true, trim: true },
    wheelName: { type: String, required: true, trim: true },
    purchaseId: { type: String, trim: true, default: "" },
    purchaseDate: { type: Date },
    purchaseLocation: { type: String, trim: true, default: "" },
  },
  { timestamps: true },
);

export const WheelRegistration =
  mongoose.models.WheelRegistration ??
  mongoose.model("WheelRegistration", wheelRegistrationSchema);

export default WheelRegistration;
