import React from "react";
import { useNavigate } from "react-router-dom";
import { authAPI } from "../api/authAPI";

const Layout = ({ children }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    authAPI.logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md">
        <div className="p-6 text-xl font-bold border-b">
          StockFlow
        </div>

        <nav className="p-4 space-y-2">
          <button
            onClick={() => navigate("/dashboard")}
            className="w-full text-left px-4 py-2 rounded hover:bg-gray-100"
          >
            Dashboard
          </button>

          <button
            onClick={() => navigate("/products")}
            className="w-full text-left px-4 py-2 rounded hover:bg-gray-100"
          >
            Products
          </button>

          <button
            onClick={() => navigate("/settings")}
            className="w-full text-left px-4 py-2 rounded hover:bg-gray-100"
          >
            Settings
          </button>

          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 rounded text-red-600 hover:bg-red-50"
          >
            Logout
          </button>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6">
        {children}
      </main>
    </div>
  );
};

export default Layout;
