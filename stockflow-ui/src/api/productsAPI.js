const API_BASE_URL = "http://localhost:5000/api/products";

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
 * PRODUCTS API
 */
export const productsAPI = {
  /**
   * GET ALL PRODUCTS
   */
  getAll: async () => {
    const response = await fetch(API_BASE_URL, {
      headers: getAuthHeaders()
    });

    return handleResponse(response);
  },

  /**
   * CREATE PRODUCT
   */
  create: async ({
    name,
    sku,
    description,
    quantityOnHand,
    costPrice,
    sellingPrice,
    lowStockThreshold
  }) => {
    const response = await fetch(API_BASE_URL, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify({
        name,
        sku,
        description,
        quantityOnHand,
        costPrice,
        sellingPrice,
        lowStockThreshold
      })
    });

    return handleResponse(response);
  },

  /**
   * GET SINGLE PRODUCT
   */
  getById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      headers: getAuthHeaders()
    });

    return handleResponse(response);
  },

  /**
   * UPDATE PRODUCT
   */
  update: async (id, updates) => {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(updates)
    });

    return handleResponse(response);
  },

  /**
   * DELETE PRODUCT
   */
  remove: async (id) => {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders()
    });

    return handleResponse(response);
  }
};
