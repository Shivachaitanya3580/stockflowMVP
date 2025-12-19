import mongoose from "mongoose";

const organizationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    // Optional: who created the org (useful later)
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },

    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true // adds createdAt & updatedAt automatically
  }
);

// Optional index for faster lookups
organizationSchema.index({ name: 1 });

export default mongoose.model("Organization", organizationSchema);
