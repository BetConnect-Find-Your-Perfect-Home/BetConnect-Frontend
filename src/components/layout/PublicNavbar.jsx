import { Link, useLocation } from 'react-router-dom';
import { Shield } from 'lucide-react';

export default function PublicNavbar() {
  const location = useLocation();

  return (
    <header className="h-20 bg-white/95 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-linear-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
            <Shield className="text-white" size={28} />
          </div>
          <div>
            <span className="text-3xl font-bold tracking-tighter bg-linear-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              BetConnect
            </span>
          </div>
        </div>

        {/* Auth Buttons */}
        <div className="flex items-center gap-4">
          <Link
            to="/login"
            className={`px-8 py-3 text-sm font-semibold rounded-2xl transition-all ${
              location.pathname === '/login'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            Login
          </Link>

          <Link
            to="/register"
            className="px-8 py-3 text-sm font-semibold bg-linear-to-r from-blue-600 to-indigo-600 text-white rounded-2xl hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg shadow-blue-500/30"
          >
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
}