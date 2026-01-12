import React from 'react';
import { Zap, Users, BarChart3 } from 'lucide-react';

const WelcomePage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-brand-50 via-white to-brand-100">
      <div className="max-w-6xl mx-auto px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-extrabold text-brand-500 leading-tight mb-4">Welcome to Pasale</h1>
          <p className="text-xl text-gray-600 mb-8">Quickly manage your business and connect with customers — simple, secure, and fast.</p>

          <div className="flex gap-4 justify-center">
            <a href="/signup" className="inline-flex items-center gap-2 px-8 py-3 bg-brand-400 hover:bg-brand-500 text-white font-semibold rounded-lg shadow-lg transition">
              Get Started
            </a>
            <a href="/login" className="inline-flex items-center gap-2 px-8 py-3 border-2 border-brand-400 text-brand-500 font-semibold rounded-lg hover:bg-brand-50 transition">
              Sign In
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          <div className="bg-white/95 backdrop-blur-md rounded-xl p-8 shadow-lg hover:shadow-xl transition">
            <div className="w-12 h-12 bg-brand-100 rounded-lg flex items-center justify-center mb-4">
              <Zap className="text-brand-500" size={28} />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Fast Onboarding</h3>
            <p className="text-gray-600">Create an account in seconds and start accepting orders immediately.</p>
          </div>

          <div className="bg-white/95 backdrop-blur-md rounded-xl p-8 shadow-lg hover:shadow-xl transition">
            <div className="w-12 h-12 bg-brand-100 rounded-lg flex items-center justify-center mb-4">
              <Users className="text-brand-500" size={28} />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Customer Management</h3>
            <p className="text-gray-600">Manage parties, track transactions, and maintain relationships effortlessly.</p>
          </div>

          <div className="bg-white/95 backdrop-blur-md rounded-xl p-8 shadow-lg hover:shadow-xl transition">
            <div className="w-12 h-12 bg-brand-100 rounded-lg flex items-center justify-center mb-4">
              <BarChart3 className="text-brand-500" size={28} />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Analytics & Insights</h3>
            <p className="text-gray-600">Get detailed reports on sales, inventory, and business performance.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
