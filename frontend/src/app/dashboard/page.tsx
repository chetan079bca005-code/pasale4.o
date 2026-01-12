import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, CreditCard, Package, Users, BarChart3, DollarSign, Bell, LogOut, Sun, Moon, Settings, HelpCircle, TrendingUp, TrendingDown, Menu, ArrowUpRight, ArrowDownLeft } from 'lucide-react';

const StatCard: React.FC<{ title: string; value: string; subtitle?: string; icon?: React.ReactNode; trend?: 'up' | 'down' }> = ({ title, value, subtitle, icon, trend }) => (
  <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition">
    <div className="flex items-start justify-between mb-4">
      <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-brand-50">
        {icon || <DollarSign className="text-brand-500" size={24} />}
      </div>
      {trend && (
        <div className={`flex items-center gap-1 text-sm font-semibold ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
          {trend === 'up' ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
          {trend === 'up' ? '+12%' : '-5%'}
        </div>
      )}
    </div>
    <div className="text-sm text-gray-500">{title}</div>
    <div className="mt-2 text-3xl font-bold text-gray-800">{value}</div>
    {subtitle && <div className="text-xs text-brand-500 mt-2">{subtitle}</div>}
  </div>
);

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [userName, setUserName] = useState('User');
  const [userEmail, setUserEmail] = useState('user@example.com');
  const [activities] = useState([
    { id: 1, title: 'Order Revenue', amount: 874, date: 'Apr 27, 2024', type: 'income' },
    { id: 2, title: 'Withdrawal Initiated', amount: 2490, date: 'Apr 25, 2024', type: 'expense' },
    { id: 3, title: 'Product Sale', amount: 1250, date: 'Apr 23, 2024', type: 'income' },
  ]);

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

  // Mock chart data points
  const chartData = [
    { month: 'Jan', value: 2500 },
    { month: 'Feb', value: 3200 },
    { month: 'Mar', value: 2800 },
    { month: 'Apr', value: 4100 },
    { month: 'May', value: 3800 },
    { month: 'Jun', value: 5200 },
  ];

  const maxValue = Math.max(...chartData.map(d => d.value));
  const chartHeight = 180;

  const points = chartData.map((d, i) => {
    const x = 60 + (i * 80);
    const y = chartHeight - (d.value / maxValue) * (chartHeight - 40);
    return { x, y, ...d };
  });

  const pathData = points.map((p, i) => {
    if (i === 0) return `M${p.x},${p.y}`;
    return `L${p.x},${p.y}`;
  }).join(' ');

  const areaData = pathData + ` L${points[points.length - 1].x},${chartHeight} L60,${chartHeight} Z`;

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50'}`}>
      <div className="flex h-screen">
        {/* Sidebar - Fixed */}
        <aside className={`${sidebarOpen ? 'w-72' : 'w-20'} bg-white shadow-lg transition-all duration-300 fixed h-screen overflow-hidden flex flex-col`}>
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
              <div className="flex-1">
                <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                  Welcome back, {userName}
                </h2>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Here's your business overview for today
                </p>
              </div>
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
          <div className="flex-1 overflow-y-auto p-8">
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatCard
                title="Total Revenue"
                value="$12,485.00"
                subtitle="+12% from last month"
                icon={<DollarSign className="text-brand-500" size={24} />}
                trend="up"
              />
              <StatCard
                title="Transactions"
                value="48"
                subtitle="This month"
                icon={<CreditCard className="text-blue-500" size={24} />}
                trend="up"
              />
              <StatCard
                title="Products"
                value="156"
                subtitle="In inventory"
                icon={<Package className="text-purple-500" size={24} />}
              />
              <StatCard
                title="Active Parties"
                value="32"
                subtitle="Registered customers"
                icon={<Users className="text-green-500" size={24} />}
              />
            </div>

            {/* Charts and Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Money Flow Chart */}
              <div className={`lg:col-span-2 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow p-6`}>
                <div className="flex items-center justify-between mb-6">
                  <h3 className={`font-semibold text-lg ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Money Flow</h3>
                  <select className={`border px-3 py-1 rounded text-sm ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'}`}>
                    <option>6 Month</option>
                    <option>12 Month</option>
                    <option>This Year</option>
                  </select>
                </div>

                <div className="h-64 rounded-lg overflow-hidden relative">
                  <svg viewBox="0 0 600 200" className="w-full h-full">
                    <defs>
                      <linearGradient id="areaGrad" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="#DFF6E8" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
                      </linearGradient>
                      <linearGradient id="lineGrad" x1="0" x2="1" y1="0" y2="0">
                        <stop offset="0%" stopColor="#65B25A" />
                        <stop offset="100%" stopColor="#1F5F50" />
                      </linearGradient>
                    </defs>

                    {/* Grid lines */}
                    {[0, 1, 2, 3].map((i) => (
                      <line key={`grid-${i}`} x1={40} x2={560} y1={40 + i * 40} y2={40 + i * 40} stroke="#EEF2F7" strokeWidth={1} />
                    ))}

                    {/* Area fill */}
                    <path d={areaData} fill="url(#areaGrad)" />

                    {/* Line chart */}
                    <path d={pathData} fill="none" stroke="url(#lineGrad)" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />

                    {/* Data points */}
                    {points.map((p, i) => (
                      <circle key={`point-${i}`} cx={p.x} cy={p.y} r={4} fill="#1F5F50" stroke="white" strokeWidth={2} />
                    ))}

                    {/* X axis labels */}
                    {points.map((p) => (
                      <text key={`label-${p.month}`} x={p.x} y={195} fontSize={12} fill="#9CA3AF" textAnchor="middle">
                        {p.month}
                      </text>
                    ))}
                  </svg>
                </div>
              </div>

              {/* Quick Stats */}
              <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow p-6`}>
                <h4 className={`font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Quick Stats</h4>
                <div className="space-y-4">
                  <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-brand-50'}`}>
                    <div className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Today's Revenue</div>
                    <div className={`text-2xl font-bold mt-1 ${isDarkMode ? 'text-white' : 'text-brand-600'}`}>$1,245</div>
                  </div>
                  <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-blue-50'}`}>
                    <div className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Pending Orders</div>
                    <div className={`text-2xl font-bold mt-1 ${isDarkMode ? 'text-white' : 'text-blue-600'}`}>5</div>
                  </div>
                  <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-purple-50'}`}>
                    <div className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Low Stock Items</div>
                    <div className={`text-2xl font-bold mt-1 ${isDarkMode ? 'text-white' : 'text-purple-600'}`}>3</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className={`mt-8 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow p-6`}>
              <h4 className={`font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Recent Activity</h4>
              <div className="space-y-3">
                {activities.map((activity) => (
                  <div key={activity.id} className={`flex items-center justify-between p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-gray-50'} hover:shadow transition`}>
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${activity.type === 'income' ? 'bg-green-100' : 'bg-red-100'}`}>
                        {activity.type === 'income' ? (
                          <ArrowDownLeft className="text-green-600" size={20} />
                        ) : (
                          <ArrowUpRight className="text-red-600" size={20} />
                        )}
                      </div>
                      <div>
                        <div className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>{activity.title}</div>
                        <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{activity.date}</div>
                      </div>
                    </div>
                    <div className={`font-semibold ${activity.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                      {activity.type === 'income' ? '+' : '-'} ${activity.amount.toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
