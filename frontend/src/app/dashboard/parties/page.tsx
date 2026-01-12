import React, { useState } from 'react';
import { Users, Plus, Mail, Phone, MapPin, Edit, Trash2 } from 'lucide-react';
import { DashboardLayout } from '../../../components/DashboardLayout';

const PartiesPage: React.FC = () => {
  const [parties] = useState([
    { id: 1, name: 'Acme Corporation', email: 'contact@acme.com', phone: '+1-555-0101', city: 'New York', totalOrders: 24, totalSpent: 12450 },
    { id: 2, name: 'Tech Innovations Ltd', email: 'orders@techinov.com', phone: '+1-555-0102', city: 'San Francisco', totalOrders: 18, totalSpent: 8920 },
    { id: 3, name: 'Global Traders Inc', email: 'buy@globaltraders.com', phone: '+1-555-0103', city: 'Chicago', totalOrders: 31, totalSpent: 25680 },
    { id: 4, name: 'Local Retail Store', email: 'manager@localretail.com', phone: '+1-555-0104', city: 'Boston', totalOrders: 12, totalSpent: 4560 },
    { id: 5, name: 'Premium Wholesale', email: 'wholesale@premium.com', phone: '+1-555-0105', city: 'Los Angeles', totalOrders: 45, totalSpent: 62340 },
  ]);

  const totalRevenue = parties.reduce((sum, p) => sum + p.totalSpent, 0);

  return (
    <DashboardLayout>
      <div className="p-8">
        <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Parties (Customers)</h1>
          <p className="text-gray-600">Manage your customer relationships</p>
        </div>
        <button className="px-4 py-2 bg-brand-400 hover:bg-brand-500 text-white rounded-lg flex items-center gap-2 transition">
          <Plus size={18} /> Add Customer
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-sm text-gray-500 mb-2">Total Customers</div>
          <div className="text-3xl font-bold text-gray-800">{parties.length}</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-sm text-gray-500 mb-2">Total Orders</div>
          <div className="text-3xl font-bold text-gray-800">{parties.reduce((sum, p) => sum + p.totalOrders, 0)}</div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-sm text-gray-500 mb-2">Total Revenue</div>
          <div className="text-3xl font-bold text-brand-600">${(totalRevenue / 1000).toFixed(1)}k</div>
        </div>
      </div>

      {/* Customers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {parties.map((party) => (
          <div key={party.id} className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-brand-100 rounded-lg flex items-center justify-center">
                <Users className="text-brand-500" size={24} />
              </div>
              <div className="flex gap-1">
                <button className="p-2 text-brand-500 hover:bg-brand-50 rounded transition">
                  <Edit size={18} />
                </button>
                <button className="p-2 text-red-500 hover:bg-red-50 rounded transition">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>

            <h3 className="font-bold text-lg text-gray-800 mb-3">{party.name}</h3>

            <div className="space-y-2 mb-4 text-sm">
              <div className="flex items-center gap-2 text-gray-600">
                <Mail size={16} className="text-gray-400" />
                {party.email}
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Phone size={16} className="text-gray-400" />
                {party.phone}
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin size={16} className="text-gray-400" />
                {party.city}
              </div>
            </div>

            <div className="border-t pt-4 mt-4 grid grid-cols-2 gap-4">
              <div>
                <div className="text-xs text-gray-500 uppercase">Orders</div>
                <div className="text-2xl font-bold text-gray-800">{party.totalOrders}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500 uppercase">Total Spent</div>
                <div className="text-2xl font-bold text-brand-600">${(party.totalSpent / 1000).toFixed(1)}k</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      </div>
    </DashboardLayout>
  );
};

export default PartiesPage;
