import express from "express";
import {
  getSettings,
  updateSettings
} from "../controllers/settings.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

/**
 * 🔐 Protect all settings routes
 */
router.use(authMiddleware);

/**
 * @route   GET /api/settings
 * @desc    Get organization settings
 * @access  Private
 */
router.get("/", getSettings);

/**
 * @route   PUT /api/settings
 * @desc    Update organization settings
 * @access  Private
 */
router.put("/", updateSettings);

export default router;
