const API_BASE_URL = "https://stockflowmvp-backend.onrender.com/api/settings";

/**
 * Get auth headers
 */
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Not authenticated");
  }

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`
  };
};

/**
 * Handle API response
 */
const handleResponse = async (response) => {
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Request failed");
  }

  return data;
};

/**
 * SETTINGS API
 */
export const settingsAPI = {
  /**
   * GET SETTINGS
   * Fetch organization settings
   */
  get: async () => {
    const response = await fetch(API_BASE_URL, {
      headers: getAuthHeaders()
    });

    return handleResponse(response);
  },

  /**
   * UPDATE SETTINGS
   * Update default low stock threshold
   */
  update: async ({ defaultLowStockThreshold }) => {
    const response = await fetch(API_BASE_URL, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify({
        defaultLowStockThreshold
      })
    });

    return handleResponse(response);
  }
};
