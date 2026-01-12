import React, { useState } from 'react';
import { CreditCard, Download, Plus, Check } from 'lucide-react';
import { DashboardLayout } from '../../../components/DashboardLayout';

const BillingPage: React.FC = () => {
  const [invoices] = useState([
    { id: 'INV-001', date: '2024-04-27', amount: 1250, status: 'paid', customer: 'Acme Corporation' },
    { id: 'INV-002', date: '2024-04-26', amount: 890, status: 'pending', customer: 'Tech Innovations Ltd' },
    { id: 'INV-003', date: '2024-04-25', amount: 2450, status: 'paid', customer: 'Global Traders Inc' },
    { id: 'INV-004', date: '2024-04-24', amount: 560, status: 'overdue', customer: 'Local Retail Store' },
    { id: 'INV-005', date: '2024-04-23', amount: 3200, status: 'paid', customer: 'Premium Wholesale' },
  ]);

  const totalBilled = invoices.reduce((sum, inv) => sum + inv.amount, 0);
  const totalPaid = invoices.filter(inv => inv.status === 'paid').reduce((sum, inv) => sum + inv.amount, 0);

  return (
    <DashboardLayout>
      <div className="p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Billing</h1>
            <p className="text-gray-600">Manage invoices and payments</p>
          </div>
          <button className="px-4 py-2 bg-brand-400 hover:bg-brand-500 text-white rounded-lg flex items-center gap-2 transition">
            <Plus size={18} /> Create Invoice
          </button>
        </div>

      {/* Billing Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <CreditCard className="text-blue-600" size={24} />
            </div>
            <div>
              <div className="text-sm text-gray-500">Total Billed</div>
              <div className="text-2xl font-bold text-gray-800">${(totalBilled / 1000).toFixed(1)}k</div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div>
            <div className="text-sm text-gray-500 mb-2">Paid</div>
            <div className="text-2xl font-bold text-green-600">${(totalPaid / 1000).toFixed(1)}k</div>
            <div className="text-xs text-gray-500 mt-1">{((totalPaid / totalBilled) * 100).toFixed(0)}% paid</div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div>
            <div className="text-sm text-gray-500 mb-2">Pending</div>
            <div className="text-2xl font-bold text-yellow-600">
              ${invoices.filter(inv => inv.status === 'pending').reduce((sum, inv) => sum + inv.amount, 0)}
            </div>
            <div className="text-xs text-gray-500 mt-1">{invoices.filter(inv => inv.status === 'pending').length} invoices</div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div>
            <div className="text-sm text-gray-500 mb-2">Overdue</div>
            <div className="text-2xl font-bold text-red-600">
              ${invoices.filter(inv => inv.status === 'overdue').reduce((sum, inv) => sum + inv.amount, 0)}
            </div>
            <div className="text-xs text-gray-500 mt-1">{invoices.filter(inv => inv.status === 'overdue').length} invoices</div>
          </div>
        </div>
      </div>

      {/* Invoices Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Invoice ID</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Customer</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Date</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Amount</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Action</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((invoice) => (
                <tr key={invoice.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                  <td className="px-6 py-4 font-semibold text-gray-800">{invoice.id}</td>
                  <td className="px-6 py-4 text-gray-600">{invoice.customer}</td>
                  <td className="px-6 py-4 text-gray-600">{invoice.date}</td>
                  <td className="px-6 py-4 font-semibold text-gray-800">${invoice.amount.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium inline-flex items-center gap-1 ${
                      invoice.status === 'paid' ? 'bg-green-100 text-green-800' :
                      invoice.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {invoice.status === 'paid' && <Check size={16} />}
                      {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-brand-500 hover:text-brand-700 font-medium text-sm flex items-center gap-1">
                      <Download size={16} /> Download
                    </button>
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

export default BillingPage;
