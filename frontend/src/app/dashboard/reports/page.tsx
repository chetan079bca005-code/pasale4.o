import React, { useState } from 'react';
import { Download, TrendingUp } from 'lucide-react';
import { DashboardLayout } from '../../../components/DashboardLayout';

const ReportsPage: React.FC = () => {
  const [dateRange, setDateRange] = useState('month');

  const reportData = {
    totalRevenue: 45230,
    totalExpenses: 18450,
    netProfit: 26780,
    orders: 156,
    customers: 32,
    products: 156,
  };

  return (
    <DashboardLayout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Reports & Analytics</h1>
          <p className="text-gray-600">Analyze your business performance</p>
        </div>

        {/* Date Range Selector */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <label className="text-sm font-medium text-gray-700">Period:</label>
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
              >
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="quarter">This Quarter</option>
                <option value="year">This Year</option>
              </select>
            </div>
            <button className="px-4 py-2 bg-brand-400 hover:bg-brand-500 text-white rounded-lg flex items-center gap-2 transition">
              <Download size={18} /> Export Report
            </button>
          </div>
        </div>

      {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-linear-to-br from-green-50 to-green-100 rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-green-600 font-medium uppercase mb-2">Total Revenue</div>
                <div className="text-4xl font-bold text-green-900">${(reportData.totalRevenue / 1000).toFixed(1)}k</div>
                <div className="text-sm text-green-700 mt-2 flex items-center gap-1">
                  <TrendingUp size={16} /> +15% from last period
                </div>
              </div>
            </div>
          </div>

          <div className="bg-linear-to-br from-red-50 to-red-100 rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-red-600 font-medium uppercase mb-2">Total Expenses</div>
                <div className="text-4xl font-bold text-red-900">${(reportData.totalExpenses / 1000).toFixed(1)}k</div>
                <div className="text-sm text-red-700 mt-2 flex items-center gap-1">
                  <TrendingUp size={16} /> +8% from last period
                </div>
              </div>
            </div>
          </div>

          <div className="bg-linear-to-br from-blue-50 to-blue-100 rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-blue-600 font-medium uppercase mb-2">Net Profit</div>
                <div className="text-4xl font-bold text-blue-900">${(reportData.netProfit / 1000).toFixed(1)}k</div>
                <div className="text-sm text-blue-700 mt-2 flex items-center gap-1">
                  <TrendingUp size={16} /> +22% from last period
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Detailed Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="font-semibold text-gray-800 mb-4">Orders</h3>
            <div className="text-3xl font-bold text-gray-800 mb-2">{reportData.orders}</div>
            <div className="text-sm text-gray-600">Total transactions this period</div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="font-semibold text-gray-800 mb-4">Customers</h3>
            <div className="text-3xl font-bold text-gray-800 mb-2">{reportData.customers}</div>
            <div className="text-sm text-gray-600">Active customers</div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="font-semibold text-gray-800 mb-4">Products</h3>
            <div className="text-3xl font-bold text-gray-800 mb-2">{reportData.products}</div>
            <div className="text-sm text-gray-600">Total inventory</div>
          </div>
        </div>

        {/* Profit Margin */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="font-semibold text-lg text-gray-800 mb-6">Profit Analysis</h3>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-700">Revenue</span>
                <span className="font-semibold text-gray-800">${reportData.totalRevenue}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '100%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-700">Expenses</span>
                <span className="font-semibold text-gray-800">${reportData.totalExpenses}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-red-500 h-2 rounded-full" style={{ width: `${(reportData.totalExpenses / reportData.totalRevenue) * 100}%` }}></div>
              </div>
            </div>

            <div className="pt-4 border-t">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-700 font-medium">Net Profit</span>
                <span className="font-bold text-green-600">${reportData.netProfit}</span>
              </div>
              <div className="text-sm text-gray-600">
                Profit Margin: {((reportData.netProfit / reportData.totalRevenue) * 100).toFixed(1)}%
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ReportsPage;
