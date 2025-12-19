import express from "express";
import {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct
} from "../controllers/product.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

/**
 * 🔐 Protect all product routes
 */
router.use(authMiddleware);

/**
 * @route   POST /api/products
 * @desc    Create a new product (org-scoped)
 * @access  Private
 */
router.post("/", createProduct);

/**
 * @route   GET /api/products
 * @desc    Get all products for logged-in user's organization
 * @access  Private
 */
router.get("/", getProducts);

/**
 * @route   GET /api/products/:id
 * @desc    Get a single product by ID (org-scoped)
 * @access  Private
 */
router.get("/:id", getProduct);

/**
 * @route   PUT /api/products/:id
 * @desc    Update a product by ID (org-scoped)
 * @access  Private
 */
router.put("/:id", updateProduct);

/**
 * @route   DELETE /api/products/:id
 * @desc    Delete a product by ID (org-scoped)
 * @access  Private
 */
router.delete("/:id", deleteProduct);

export default router;
