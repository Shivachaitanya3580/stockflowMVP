import mongoose from "mongoose";

const settingsSchema = new mongoose.Schema(
  {
    // 🔐 One settings document per organization
    organization: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organization",
      required: true,
      unique: true,
      index: true
    },

    // 🚨 Default threshold used when product-level threshold is not set
    defaultLowStockThreshold: {
      type: Number,
      default: 5,
      min: 0
    }
  },
  {
    timestamps: true // adds createdAt & updatedAt
  }
);

export default mongoose.model("Settings", settingsSchema);
