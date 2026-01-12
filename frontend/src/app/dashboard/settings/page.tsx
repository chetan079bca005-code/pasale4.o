import React, { useState } from 'react';
import { Settings as SettingsIcon, Save, Lock, Bell, Eye, EyeOff } from 'lucide-react';
import { DashboardLayout } from '../../../components/DashboardLayout';

const SettingsPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [settings, setSettings] = useState({
    businessName: 'My Business',
    email: 'user@example.com',
    phone: '+1-555-0000',
    address: '123 Business St, New York, NY 10001',
    currency: 'USD',
    timezone: 'America/New_York',
    notifications: true,
    emailAlerts: true,
    smsAlerts: false,
  });

  const handleChange = (field: string, value: any) => {
    setSettings({ ...settings, [field]: value });
  };

  return (
    <DashboardLayout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Settings</h1>
          <p className="text-gray-600">Manage your account and preferences</p>
        </div>

        <div className="max-w-2xl">
          {/* Business Information */}
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <SettingsIcon size={24} className="text-brand-500" />
              Business Information
            </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Business Name</label>
              <input
                type="text"
                value={settings.businessName}
                onChange={(e) => handleChange('businessName', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-300"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={settings.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-300"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                <input
                  type="tel"
                  value={settings.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-300"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
              <input
                type="text"
                value={settings.address}
                onChange={(e) => handleChange('address', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-300"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
                <select
                  value={settings.currency}
                  onChange={(e) => handleChange('currency', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-300"
                >
                  <option>USD</option>
                  <option>EUR</option>
                  <option>GBP</option>
                  <option>INR</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
                <select
                  value={settings.timezone}
                  onChange={(e) => handleChange('timezone', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-300"
                >
                  <option>America/New_York</option>
                  <option>America/Chicago</option>
                  <option>America/Denver</option>
                  <option>America/Los_Angeles</option>
                </select>
              </div>
            </div>
            </div>
          </div>
        </div>
  
          {/* Notifications */}
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <Bell size={24} className="text-brand-500" />
              Notifications
            </h2>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-gray-800">Push Notifications</div>
                <div className="text-sm text-gray-600">Receive notifications on your device</div>
              </div>
              <input
                type="checkbox"
                checked={settings.notifications}
                onChange={(e) => handleChange('notifications', e.target.checked)}
                className="w-5 h-5 cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-gray-800">Email Alerts</div>
                <div className="text-sm text-gray-600">Get alerts via email</div>
              </div>
              <input
                type="checkbox"
                checked={settings.emailAlerts}
                onChange={(e) => handleChange('emailAlerts', e.target.checked)}
                className="w-5 h-5 cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-gray-800">SMS Alerts</div>
                <div className="text-sm text-gray-600">Get alerts via SMS</div>
              </div>
              <input
                type="checkbox"
                checked={settings.smsAlerts}
                onChange={(e) => handleChange('smsAlerts', e.target.checked)}
                className="w-5 h-5 cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Security */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <Lock size={24} className="text-brand-500" />
            Security
          </h2>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Change Password</label>
            <div className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg">
              <Lock size={18} className="text-gray-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                className="flex-1 focus:outline-none bg-transparent"
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            <button className="mt-4 px-4 py-2 bg-brand-400 hover:bg-brand-500 text-white rounded-lg transition">
              Update Password
            </button>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button className="px-6 py-2 bg-brand-400 hover:bg-brand-500 text-white rounded-lg font-semibold flex items-center gap-2 transition">
            <Save size={18} /> Save Changes
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SettingsPage;
