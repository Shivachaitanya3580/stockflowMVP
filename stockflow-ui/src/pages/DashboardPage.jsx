import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Alert from "../components/common/Alert";
import { productsAPI } from "../api/productsAPI";
import { settingsAPI } from "../api/settingsAPI";

const DashboardPage = () => {
  const [products, setProducts] = useState([]);
  const [threshold, setThreshold] = useState(5);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const [productsData, settingsData] = await Promise.all([
          productsAPI.getAll(),
          settingsAPI.get()
        ]);

        setProducts(productsData);
        setThreshold(settingsData.defaultLowStockThreshold);
      } catch (err) {
        setError(err.message || "Failed to load dashboard");
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  // 📊 Calculations
  const totalProducts = products.length;

  const totalStock = products.reduce(
    (sum, p) => sum + (p.quantityOnHand || 0),
    0
  );

  const lowStockProducts = products.filter((p) => {
    const limit =
      p.lowStockThreshold !== undefined && p.lowStockThreshold !== null
        ? p.lowStockThreshold
        : threshold;

    return p.quantityOnHand <= limit;
  });

  return (
    <Layout>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Dashboard
        </h1>
        <p className="text-sm text-gray-500">
          Inventory overview & low stock alerts
        </p>
      </div>

      {/* Error */}
      {error && (
        <Alert
          type="error"
          message={error}
          onClose={() => setError("")}
        />
      )}

      {/* Loading */}
      {loading ? (
        <div className="text-gray-600">Loading dashboard...</div>
      ) : (
        <>
          {/* 📦 Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6 border">
              <p className="text-sm text-gray-500">Total Products</p>
              <p className="text-3xl font-bold text-gray-800 mt-2">
                {totalProducts}
              </p>
            </div>

            <div className="bg-white rounded-lg shadow p-6 border">
              <p className="text-sm text-gray-500">Total Stock Units</p>
              <p className="text-3xl font-bold text-gray-800 mt-2">
                {totalStock}
              </p>
            </div>

            <div className="bg-white rounded-lg shadow p-6 border">
              <p className="text-sm text-gray-500">Low Stock Items</p>
              <p className="text-3xl font-bold text-red-600 mt-2">
                {lowStockProducts.length}
              </p>
            </div>
          </div>

          {/* 🚨 Low Stock Table */}
          <div className="bg-white rounded-lg shadow border">
            <div className="p-4 border-b">
              <h2 className="text-lg font-semibold text-gray-800">
                Low Stock Products
              </h2>
            </div>

            {lowStockProducts.length === 0 ? (
              <div className="p-6 text-gray-500">
                🎉 All products are sufficiently stocked.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 text-gray-600">
                    <tr>
                      <th className="text-left px-4 py-3">Name</th>
                      <th className="text-left px-4 py-3">SKU</th>
                      <th className="text-left px-4 py-3">Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {lowStockProducts.map((product) => (
                      <tr
                        key={product._id}
                        className="border-t hover:bg-gray-50"
                      >
                        <td className="px-4 py-3 font-medium text-gray-800">
                          {product.name}
                        </td>
                        <td className="px-4 py-3 text-gray-600">
                          {product.sku}
                        </td>
                        <td className="px-4 py-3 text-red-600 font-semibold">
                          {product.quantityOnHand}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      )}
    </Layout>
  );
};

export default DashboardPage;
