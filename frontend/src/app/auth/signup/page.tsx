import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Building, Mail, Phone, Lock, CheckCircle, AlertCircle, Loader } from 'lucide-react';

const SignupPage: React.FC = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    business: '',
    email: '',
    phone: '',
    password: '',
    confirm: '',
  });
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!form.name || !form.email || !form.password) {
      setError('Please fill all required fields');
      return;
    }

    if (form.password !== form.confirm) {
      setError('Passwords do not match');
      return;
    }

    if (!agree) {
      setError('You must agree to the terms and privacy policy');
      return;
    }

    setLoading(true);

    // Simulate account creation (replace with real API call)
    setTimeout(() => {
      // Save user data to localStorage
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      users.push({ ...form });
      localStorage.setItem('users', JSON.stringify(users));
      
      setSuccess('Account created successfully! Redirecting to login...');
      setLoading(false);

      // Redirect to login after 2 seconds
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    }, 1000);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-brand-50 to-brand-200">
      <div className="bg-white/95 shadow-2xl rounded-2xl px-10 py-10 w-full max-w-lg backdrop-blur-md">
        <h2 className="text-3xl font-bold text-center text-brand-500 mb-6">Create Account</h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full name</label>
              <div className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-brand-300">
                <User size={18} className="text-gray-400" />
                <input name="name" value={form.name} onChange={handleChange} required className="flex-1 focus:outline-none bg-transparent" placeholder="John Doe" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Business name</label>
              <div className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-brand-300">
                <Building size={18} className="text-gray-400" />
                <input name="business" value={form.business} onChange={handleChange} className="flex-1 focus:outline-none bg-transparent" placeholder="Acme Co." />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
            <div className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-brand-300">
              <Mail size={18} className="text-gray-400" />
              <input name="email" value={form.email} onChange={handleChange} type="email" required className="flex-1 focus:outline-none bg-transparent" placeholder="you@example.com" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone number</label>
            <div className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-brand-300">
              <Phone size={18} className="text-gray-400" />
              <input name="phone" value={form.phone} onChange={handleChange} type="tel" className="flex-1 focus:outline-none bg-transparent" placeholder="+1 555 555 5555" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <div className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-brand-300">
                <Lock size={18} className="text-gray-400" />
                <input name="password" value={form.password} onChange={handleChange} type="password" required className="flex-1 focus:outline-none bg-transparent" placeholder="••••••••" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Confirm password</label>
              <div className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-brand-300">
                <Lock size={18} className="text-gray-400" />
                <input name="confirm" value={form.confirm} onChange={handleChange} type="password" required className="flex-1 focus:outline-none bg-transparent" placeholder="••••••••" />
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <input id="agree" type="checkbox" checked={agree} onChange={e => setAgree(e.target.checked)} className="h-4 w-4 mt-1" />
            <label htmlFor="agree" className="text-sm text-gray-700">I agree to the <a className="text-brand-500 hover:underline" href="/terms">Terms</a> and <a className="text-brand-500 hover:underline" href="/privacy">Privacy Policy</a></label>
          </div>

          {error && <div className="p-3 rounded bg-red-50 text-red-600 text-sm flex items-center gap-2"><AlertCircle size={18} />{error}</div>}
          {success && <div className="p-3 rounded bg-brand-50 text-brand-600 text-sm flex items-center gap-2"><CheckCircle size={18} />{success}</div>}

          <button type="submit" disabled={loading} className="w-full py-2 mt-4 bg-brand-400 hover:bg-brand-500 disabled:opacity-50 text-white font-semibold rounded-lg shadow-md transition flex items-center justify-center gap-2">{loading ? <><Loader size={18} className="animate-spin" /> Creating...</> : 'Create account'}</button>
        </form>

        <div className="mt-4 text-center">
          <span className="text-gray-600 text-sm">Already have an account?</span>
          <a href="/login" className="text-brand-500 font-medium ml-1 hover:underline">Sign in</a>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
