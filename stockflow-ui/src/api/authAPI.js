const API_BASE_URL = "https://stockflowmvp-backend.onrender.com";


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
 * AUTH API
 */
export const authAPI = {
  /**
   * SIGNUP
   * Creates user + organization
   */
  signup: async ({ email, password, orgName }) => {
    const response = await fetch(`${API_BASE_URL}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email,
        password,
        orgName
      })
    });

    return handleResponse(response);
  },

  /**
   * LOGIN
   * Returns JWT token
   */
  login: async ({ email, password }) => {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email,
        password
      })
    });

    const data = await handleResponse(response);

    // 🔐 Save token
    if (data.token) {
      localStorage.setItem("token", data.token);
    }

    return data;
  },

  /**
   * LOGOUT
   */
  logout: () => {
    localStorage.removeItem("token");
  },

  /**
   * GET STORED TOKEN
   */
  getToken: () => {
    return localStorage.getItem("token");
  },

  /**
   * CHECK AUTH STATUS
   */
  isAuthenticated: () => {
    return !!localStorage.getItem("token");
  }
};
