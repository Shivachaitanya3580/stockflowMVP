import React, { useState } from "react";
import { productsAPI } from "../api/productsAPI";

const ProductForm = ({
  initialData = null,
  onSuccess,
  onCancel
}) => {
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    sku: initialData?.sku || "",
    description: initialData?.description || "",
    quantityOnHand: initialData?.quantityOnHand || 0,
    costPrice: initialData?.costPrice || "",
    sellingPrice: initialData?.sellingPrice || "",
    lowStockThreshold: initialData?.lowStockThreshold || ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (initialData?._id) {
        // UPDATE
        await productsAPI.update(initialData._id, formData);
      } else {
        // CREATE
        await productsAPI.create(formData);
      }

      onSuccess && onSuccess();
    } catch (err) {
      setError(err.message || "Failed to save product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded shadow space-y-4 max-w-xl"
    >
      <h2 className="text-xl font-semibold">
        {initialData ? "Edit Product" : "Add Product"}
      </h2>

      {error && (
        <div className="text-red-600 text-sm bg-red-50 p-2 rounded">
          {error}
        </div>
      )}

      {/* Product Name */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Product Name *
        </label>
        <input
          type="text"
          name="name"
          required
          value={formData.name}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        />
      </div>

      {/* SKU */}
      <div>
        <label className="block text-sm font-medium mb-1">
          SKU *
        </label>
        <input
          type="text"
          name="sku"
          required
          value={formData.sku}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
          disabled={!!initialData} // SKU should not change on edit
        />
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Description
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        />
      </div>

      {/* Quantity */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Quantity On Hand
        </label>
        <input
          type="number"
          name="quantityOnHand"
          min="0"
          value={formData.quantityOnHand}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        />
      </div>

      {/* Cost Price */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Cost Price
        </label>
        <input
          type="number"
          name="costPrice"
          min="0"
          value={formData.costPrice}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        />
      </div>

      {/* Selling Price */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Selling Price
        </label>
        <input
          type="number"
          name="sellingPrice"
          min="0"
          value={formData.sellingPrice}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        />
      </div>

      {/* Low Stock Threshold */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Low Stock Threshold
        </label>
        <input
          type="number"
          name="lowStockThreshold"
          min="0"
          value={formData.lowStockThreshold}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        />
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-4">
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save Product"}
        </button>

        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="border px-4 py-2 rounded hover:bg-gray-100"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default ProductForm;
