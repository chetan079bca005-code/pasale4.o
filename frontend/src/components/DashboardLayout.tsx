import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, CreditCard, Package, Users, BarChart3, DollarSign, Settings, Bell, LogOut, Sun, Moon, Menu, HelpCircle } from 'lucide-react';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [userName, setUserName] = useState('User');
  const [userEmail, setUserEmail] = useState('user@example.com');

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      navigate('/login');
    } else {
      const userData = JSON.parse(user);
      setUserName(userData.name || 'User');
      setUserEmail(userData.email || 'user@example.com');
    }
  }, [navigate]);

  function handleLogout() {
    localStorage.removeItem('user');
    navigate('/login');
  }

  const navItems = [
    { icon: Home, label: 'Dashboard', path: '/dashboard' },
    { icon: CreditCard, label: 'Transactions', path: '/dashboard/transactions' },
    { icon: Package, label: 'Inventory', path: '/dashboard/inventory' },
    { icon: Users, label: 'Parties', path: '/dashboard/parties' },
    { icon: BarChart3, label: 'Reports', path: '/dashboard/reports' },
    { icon: DollarSign, label: 'Billing', path: '/dashboard/billing' },
    { icon: Settings, label: 'Settings', path: '/dashboard/settings' },
  ];

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50'}`}>
      <div className="flex h-screen">
        {/* Sidebar - Fixed */}
        <aside className={`${sidebarOpen ? 'w-72' : 'w-20'} bg-white shadow-lg transition-all duration-300 fixed h-screen overflow-hidden flex flex-col z-50`}>
          <div className={`p-6 font-bold text-2xl text-brand-500 flex items-center ${!sidebarOpen && 'justify-center'}`}>
            {sidebarOpen ? '🎯 Pasale' : '🎯'}
          </div>
          <nav className="px-4 space-y-2 flex-1 overflow-y-auto">
            {navItems.map((item) => (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-brand-50 text-gray-700 hover:text-brand-500 transition"
                title={item.label}
              >
                <item.icon size={20} />
                {sidebarOpen && <span>{item.label}</span>}
              </button>
            ))}
          </nav>
          <div className={`p-6 border-t text-xs text-gray-500 ${!sidebarOpen && 'text-center'}`}>
            {sidebarOpen && (
              <>
                <div className="font-semibold">{userName}</div>
                <div>{userEmail}</div>
              </>
            )}
          </div>
        </aside>

        {/* Main content - Adjusted for fixed sidebar */}
        <main className={`${sidebarOpen ? 'ml-72' : 'ml-20'} w-full flex flex-col transition-all duration-300`}>
          {/* Header - Fixed at top */}
          <header className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm p-6 flex items-center justify-between sticky top-0 z-40`}>
            <div className="flex items-center gap-4 flex-1">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className={`p-2 rounded-lg ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} transition shrink-0`}
                title={sidebarOpen ? 'Close sidebar' : 'Open sidebar'}
              >
                <Menu size={20} className={isDarkMode ? 'text-gray-300' : 'text-gray-700'} />
              </button>
            </div>

            <div className="flex items-center gap-4 shrink-0">
              {/* Theme toggle */}
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className={`p-2 rounded-lg ${isDarkMode ? 'bg-gray-700 text-yellow-400' : 'bg-brand-50 text-brand-500'} hover:shadow transition`}
                title="Toggle theme"
              >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>

              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className={`p-2 rounded-lg ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} transition relative`}
                >
                  <Bell size={20} className="text-gray-600" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-brand-500 rounded-full"></span>
                </button>
                {showNotifications && (
                  <div className={`absolute right-0 mt-2 w-72 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-xl p-4 z-50`}>
                    <h4 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'} mb-3`}>Notifications</h4>
                    <div className="space-y-2 text-sm">
                      <div className={`p-2 rounded ${isDarkMode ? 'bg-gray-700' : 'bg-blue-50'}`}>✓ New order received</div>
                      <div className={`p-2 rounded ${isDarkMode ? 'bg-gray-700' : 'bg-blue-50'}`}>✓ Low stock alert</div>
                      <div className={`p-2 rounded ${isDarkMode ? 'bg-gray-700' : 'bg-blue-50'}`}>✓ Payment confirmed</div>
                    </div>
                  </div>
                )}
              </div>

              {/* Profile menu */}
              <div className="relative">
                <button
                  onClick={() => setShowProfile(!showProfile)}
                  className={`w-10 h-10 bg-linear-to-br from-brand-300 to-brand-500 rounded-full text-white font-bold hover:shadow-lg transition flex items-center justify-center`}
                >
                  {userName.charAt(0).toUpperCase()}
                </button>
                {showProfile && (
                  <div className={`absolute right-0 mt-2 w-56 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-xl z-50`}>
                    <div className={`px-4 py-3 border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-100'}`}>
                      <div className="font-semibold">{userName}</div>
                      <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{userEmail}</div>
                    </div>
                    <a href="#" className={`flex items-center gap-2 px-4 py-2 ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}`}>
                      <Settings size={16} /> Settings
                    </a>
                    <a href="#" className={`flex items-center gap-2 px-4 py-2 ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}`}>
                      <HelpCircle size={16} /> Help & Support
                    </a>
                    <button
                      onClick={handleLogout}
                      className={`w-full text-left flex items-center gap-2 px-4 py-2 text-red-600 ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-red-50'} border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-100'}`}
                    >
                      <LogOut size={16} /> Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </header>

          {/* Content - Scrollable */}
          <div className="flex-1 overflow-y-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};
