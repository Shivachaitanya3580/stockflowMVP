import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    // 🔐 Multi-tenant isolation
    organization: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organization",
      required: true,
      index: true
    },

    // 📦 Product details
    name: {
      type: String,
      required: true,
      trim: true
    },

    sku: {
      type: String,
      required: true,
      trim: true
    },

    description: {
      type: String,
      trim: true
    },

    // 📊 Inventory
    quantityOnHand: {
      type: Number,
      default: 0,
      min: 0
    },

    // 💰 Pricing
    costPrice: {
      type: Number,
      min: 0
    },

    sellingPrice: {
      type: Number,
      min: 0
    },

    // 🚨 Alerts
    lowStockThreshold: {
      type: Number,
      min: 0
    }
  },
  {
    timestamps: true // adds createdAt & updatedAt
  }
);

// 🔒 Ensure SKU is unique per organization
productSchema.index(
  { organization: 1, sku: 1 },
  { unique: true }
);

export default mongoose.model("Product", productSchema);
