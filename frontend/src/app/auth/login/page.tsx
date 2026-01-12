import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, AlertCircle, Loader } from 'lucide-react';

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please enter email and password');
      return;
    }

    setLoading(true);

    // Simulate auth (replace with real API call)
    setTimeout(() => {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const user = users.find((u: any) => u.email === email && u.password === password);

      if (user) {
        localStorage.setItem('user', JSON.stringify({ email, name: user.name }));
        navigate('/dashboard');
      } else {
        setError('Invalid email or password');
      }
      setLoading(false);
    }, 800);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-brand-50 to-brand-200">
      <div className="bg-white/90 shadow-2xl rounded-2xl px-10 py-12 w-full max-w-md backdrop-blur-md">
        <h2 className="text-3xl font-bold text-center text-brand-500 mb-8">Sign In</h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">
              Email Address
            </label>
            <div className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-brand-300">
              <Mail size={18} className="text-gray-400" />
              <input
                id="email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                disabled={loading}
                className="flex-1 focus:outline-none disabled:opacity-50 bg-transparent"
                placeholder="example.com"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="password">
              Password
            </label>
            <div className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-brand-300">
              <Lock size={18} className="text-gray-400" />
              <input
                id="password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                disabled={loading}
                className="flex-1 focus:outline-none disabled:opacity-50 bg-transparent"
                placeholder="••••••••"
              />
            </div>
          </div>
          {error && (
            <div className="p-3 bg-red-50 border border-red-300 text-red-700 rounded-lg text-sm flex items-center gap-2">
              <AlertCircle size={18} />
              {error}
            </div>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 mt-2 bg-brand-400 hover:bg-brand-500 text-white font-semibold rounded-lg shadow-md transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading && <Loader size={18} className="animate-spin" />}
            {loading ? 'Signing in...' : 'Login'}
          </button>
        </form>
        <div className="mt-6 text-center">
          <span className="text-gray-600 text-sm">Don't have an account?</span>
          <a href="/signup" className="text-brand-500 font-medium ml-1 hover:underline">
            Sign up
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;