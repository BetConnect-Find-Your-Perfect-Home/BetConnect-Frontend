import { Link, useLocation } from 'react-router-dom';
import { Shield, Sparkles, Building2, Search } from 'lucide-react';

export default function PublicNavbar() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <header className="h-20 bg-white/90 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50 transition-all">
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
        
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-linear-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-200 group-hover:scale-105 transition-transform">
            <Shield className="text-white" size={24} />
          </div>
          <span className="text-2xl font-bold tracking-tighter bg-linear-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            BetConnect
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1 bg-gray-50/50 p-1.5 rounded-2xl border border-gray-100">
          <Link
            to="/browse"
            className={`flex items-center gap-2 px-5 py-2 text-sm font-bold rounded-xl transition-all ${
              isActive('/browse')
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            <Search size={16} />
            Browse Homes
          </Link>

          <Link
            to="/ai-chat"
            className={`flex items-center gap-2 px-5 py-2 text-sm font-bold rounded-xl transition-all ${
              isActive('/ai-chat')
                ? 'bg-white text-indigo-600 shadow-sm'
                : 'text-gray-500 hover:text-indigo-500'
            }`}
          >
            <Sparkles size={16} className={isActive('/ai-chat') ? "text-indigo-500" : ""} />
            AI Assistant
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className={`px-6 py-2.5 text-sm font-bold rounded-xl transition-all ${
              isActive('/login')
                ? 'text-blue-600'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            Log In
          </Link>

          <Link
            to="/register"
            className="px-6 py-2.5 text-sm font-bold bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-all shadow-xl shadow-gray-200 flex items-center gap-2"
          >
            Get Started
            <Building2 size={16} className="opacity-60" />
          </Link>
        </div>
      </div>
    </header>
  );
}