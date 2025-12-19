import Product from "../models/Product.model.js";

/**
 * CREATE PRODUCT
 */
export const createProduct = async (req, res) => {
  try {
    const {
      name,
      sku,
      description,
      quantityOnHand,
      costPrice,
      sellingPrice,
      lowStockThreshold
    } = req.body;

    // Basic validation
    if (!name || !sku) {
      return res.status(400).json({
        message: "Product name and SKU are required"
      });
    }

    const product = await Product.create({
      organization: req.user.orgId, // 🔥 from authMiddleware
      name,
      sku,
      description,
      quantityOnHand: Number(quantityOnHand) || 0,
      costPrice: costPrice !== undefined ? Number(costPrice) : undefined,
      sellingPrice: sellingPrice !== undefined ? Number(sellingPrice) : undefined,
      lowStockThreshold: lowStockThreshold !== undefined
        ? Number(lowStockThreshold)
        : undefined
    });

    return res.status(201).json(product);
  } catch (error) {
    console.error("Create product error:", error);

    // Duplicate SKU (unique index)
    if (error.code === 11000) {
      return res.status(409).json({
        message: "SKU already exists for this organization"
      });
    }

    return res.status(500).json({
      message: "Failed to create product"
    });
  }
};

/**
 * GET ALL PRODUCTS (ORG-SCOPED)
 */
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({
      organization: req.user.orgId
    }).sort({ createdAt: -1 });

    return res.json(products);
  } catch (error) {
    console.error("Get products error:", error);
    return res.status(500).json({
      message: "Failed to fetch products"
    });
  }
};

/**
 * GET SINGLE PRODUCT
 */
export const getProduct = async (req, res) => {
  try {
    const product = await Product.findOne({
      _id: req.params.id,
      organization: req.user.orgId
    });

    if (!product) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    return res.json(product);
  } catch (error) {
    console.error("Get product error:", error);
    return res.status(500).json({
      message: "Failed to fetch product"
    });
  }
};

/**
 * UPDATE PRODUCT
 */
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findOneAndUpdate(
      {
        _id: req.params.id,
        organization: req.user.orgId
      },
      {
        ...req.body,
        updatedAt: new Date()
      },
      {
        new: true,
        runValidators: true
      }
    );

    if (!product) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    return res.json(product);
  } catch (error) {
    console.error("Update product error:", error);

    if (error.code === 11000) {
      return res.status(409).json({
        message: "SKU already exists for this organization"
      });
    }

    return res.status(500).json({
      message: "Failed to update product"
    });
  }
};

/**
 * DELETE PRODUCT
 */
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findOneAndDelete({
      _id: req.params.id,
      organization: req.user.orgId
    });

    if (!product) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    return res.json({
      success: true,
      message: "Product deleted successfully"
    });
  } catch (error) {
    console.error("Delete product error:", error);
    return res.status(500).json({
      message: "Failed to delete product"
    });
  }
};
