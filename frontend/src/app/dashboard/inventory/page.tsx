import React, { useState } from 'react';
import { Package, Plus, Edit, Trash2, AlertCircle } from 'lucide-react';
import { DashboardLayout } from '../../../components/DashboardLayout';

const InventoryPage: React.FC = () => {
  const [products] = useState([
    { id: 1, name: 'Widget A', sku: 'WID-001', quantity: 145, reorderLevel: 50, price: 29.99, status: 'In Stock' },
    { id: 2, name: 'Widget B', sku: 'WID-002', quantity: 32, reorderLevel: 50, price: 39.99, status: 'Low Stock' },
    { id: 3, name: 'Gadget X', sku: 'GAD-001', quantity: 0, reorderLevel: 30, price: 99.99, status: 'Out of Stock' },
    { id: 4, name: 'Component Z', sku: 'COM-001', quantity: 287, reorderLevel: 100, price: 14.99, status: 'In Stock' },
    { id: 5, name: 'Premium Bundle', sku: 'BUN-001', quantity: 12, reorderLevel: 20, price: 149.99, status: 'Low Stock' },
  ]);

  const totalValue = products.reduce((sum, p) => sum + (p.quantity * p.price), 0);
  const lowStockItems = products.filter(p => p.quantity <= p.reorderLevel).length;

  return (
    <DashboardLayout>
      <div className="p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Inventory</h1>
            <p className="text-gray-600">Manage your products and stock levels</p>
          </div>
          <button className="px-4 py-2 bg-brand-400 hover:bg-brand-500 text-white rounded-lg flex items-center gap-2 transition">
            <Plus size={18} /> Add Product
          </button>
        </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-sm text-gray-500 mb-2">Total Products</div>
          <div className="text-3xl font-bold text-gray-800">{products.length}</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-sm text-gray-500 mb-2">Total Inventory Value</div>
          <div className="text-3xl font-bold text-gray-800">${totalValue.toFixed(2)}</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-sm text-gray-500 mb-2">Low Stock Items</div>
          <div className="text-3xl font-bold text-yellow-600">{lowStockItems}</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-sm text-gray-500 mb-2">Out of Stock</div>
          <div className="text-3xl font-bold text-red-600">{products.filter(p => p.quantity === 0).length}</div>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Product</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">SKU</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Quantity</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Price</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Action</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                        <Package className="text-purple-600" size={20} />
                      </div>
                      <span className="font-medium text-gray-800">{product.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{product.sku}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-gray-800">{product.quantity}</span>
                      {product.quantity <= product.reorderLevel && (
                        <AlertCircle className="text-yellow-500" size={18} />
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-800">${product.price.toFixed(2)}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      product.status === 'In Stock' ? 'bg-green-100 text-green-800' :
                      product.status === 'Low Stock' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {product.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button className="p-2 text-brand-500 hover:bg-brand-50 rounded transition">
                        <Edit size={18} />
                      </button>
                      <button className="p-2 text-red-500 hover:bg-red-50 rounded transition">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      </div>
    </DashboardLayout>
  );
};

export default InventoryPage;
