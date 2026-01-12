import React, { useState } from 'react';
import { ArrowUpRight, ArrowDownLeft, Search, Download } from 'lucide-react';
import { DashboardLayout } from '../../../components/DashboardLayout';

const TransactionsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  const transactions = [
    { id: 1, description: 'Product Sale - Widget A', amount: 1250, type: 'income', date: '2024-04-27', status: 'completed' },
    { id: 2, description: 'Withdrawal to Bank', amount: 2490, type: 'expense', date: '2024-04-25', status: 'pending' },
    { id: 3, description: 'Order Revenue - Bulk Order', amount: 874, type: 'income', date: '2024-04-23', status: 'completed' },
    { id: 4, description: 'Inventory Purchase', amount: 3500, type: 'expense', date: '2024-04-20', status: 'completed' },
    { id: 5, description: 'Customer Refund', amount: 125, type: 'expense', date: '2024-04-18', status: 'completed' },
    { id: 6, description: 'Service Revenue', amount: 650, type: 'income', date: '2024-04-15', status: 'completed' },
  ];

  const filtered = transactions.filter(t => {
    if (filterType !== 'all' && t.type !== filterType) return false;
    if (!t.description.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  return (
    <DashboardLayout>
      <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Transactions</h1>
        <p className="text-gray-600">View and manage all your business transactions</p>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex gap-4 items-end">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
            <div className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg">
              <Search size={18} className="text-gray-400" />
              <input
                type="text"
                placeholder="Search transactions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 focus:outline-none bg-transparent"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none"
            >
              <option value="all">All Transactions</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>
          <button className="px-4 py-2 bg-brand-400 hover:bg-brand-500 text-white rounded-lg flex items-center gap-2 transition">
            <Download size={18} /> Export
          </button>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Description</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Amount</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Date</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((tx) => (
                <tr key={tx.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${tx.type === 'income' ? 'bg-green-100' : 'bg-red-100'}`}>
                        {tx.type === 'income' ? (
                          <ArrowDownLeft className="text-green-600" size={20} />
                        ) : (
                          <ArrowUpRight className="text-red-600" size={20} />
                        )}
                      </div>
                      <span className="font-medium text-gray-800">{tx.description}</span>
                    </div>
                  </td>
                  <td className={`px-6 py-4 font-semibold ${tx.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                    {tx.type === 'income' ? '+' : '-'} ${tx.amount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-gray-600">{tx.date}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${tx.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                      {tx.status.charAt(0).toUpperCase() + tx.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-brand-500 hover:text-brand-700 font-medium text-sm">View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No transactions found</p>
        </div>
      )}
      </div>
    </DashboardLayout>
  );
};

export default TransactionsPage;
