import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from './app/auth/login/page';
import Signup from './app/auth/signup/page';
import WelcomePage from './app/welcome/page';
import Dashboard from './app/dashboard/page';
import TransactionsPage from './app/dashboard/transactions/page';
import InventoryPage from './app/dashboard/inventory/page';
import PartiesPage from './app/dashboard/parties/page';
import ReportsPage from './app/dashboard/reports/page';
import BillingPage from './app/dashboard/billing/page';
import SettingsPage from './app/dashboard/settings/page';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/transactions" element={<TransactionsPage />} />
        <Route path="/dashboard/inventory" element={<InventoryPage />} />
        <Route path="/dashboard/parties" element={<PartiesPage />} />
        <Route path="/dashboard/reports" element={<ReportsPage />} />
        <Route path="/dashboard/billing" element={<BillingPage />} />
        <Route path="/dashboard/settings" element={<SettingsPage />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;

