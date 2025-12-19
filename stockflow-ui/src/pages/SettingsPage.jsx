import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Alert from "../components/common/Alert";
import { settingsAPI } from "../api/settingsAPI";

const SettingsPage = () => {
  const [defaultLowStockThreshold, setDefaultLowStockThreshold] = useState(5);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Load settings on page load
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const data = await settingsAPI.get();
        setDefaultLowStockThreshold(data.defaultLowStockThreshold);
      } catch (err) {
        setError(err.message || "Failed to load settings");
      } finally {
        setLoading(false);
      }
    };

    loadSettings();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setSaving(true);

    try {
      await settingsAPI.update({
        defaultLowStockThreshold
      });
      setSuccess("Settings updated successfully");
    } catch (err) {
      setError(err.message || "Failed to update settings");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-6">Settings</h1>

      {error && (
        <Alert
          type="error"
          message={error}
          onClose={() => setError("")}
        />
      )}

      {success && (
        <Alert
          type="success"
          message={success}
          onClose={() => setSuccess("")}
        />
      )}

      {loading ? (
        <p>Loading settings...</p>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded shadow max-w-md"
        >
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Default Low Stock Threshold
            </label>
            <input
              type="number"
              min="0"
              value={defaultLowStockThreshold}
              onChange={(e) =>
                setDefaultLowStockThreshold(Number(e.target.value))
              }
              className="w-full border rounded px-3 py-2"
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              Used when a product does not have its own low-stock threshold.
            </p>
          </div>

          <button
            type="submit"
            disabled={saving}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Settings"}
          </button>
        </form>
      )}
    </Layout>
  );
};

export default SettingsPage;
