import Settings from "../models/Settings.model.js";

/**
 * GET SETTINGS (ORG-SCOPED)
 */
export const getSettings = async (req, res) => {
  try {
    let settings = await Settings.findOne({
      organization: req.user.orgId
    });

    // Create default settings if not exists (MVP-friendly)
    if (!settings) {
      settings = await Settings.create({
        organization: req.user.orgId
      });
    }

    return res.json(settings);
  } catch (error) {
    console.error("Get settings error:", error);
    return res.status(500).json({
      message: "Failed to fetch settings"
    });
  }
};

/**
 * UPDATE SETTINGS
 */
export const updateSettings = async (req, res) => {
  try {
    const { defaultLowStockThreshold } = req.body;

    if (defaultLowStockThreshold === undefined) {
      return res.status(400).json({
        message: "defaultLowStockThreshold is required"
      });
    }

    const settings = await Settings.findOneAndUpdate(
      { organization: req.user.orgId },
      {
        defaultLowStockThreshold: Number(defaultLowStockThreshold)
      },
      {
        new: true,
        upsert: true,       // 🔥 Create if not exists
        runValidators: true
      }
    );

    return res.json(settings);
  } catch (error) {
    console.error("Update settings error:", error);
    return res.status(500).json({
      message: "Failed to update settings"
    });
  }
};
