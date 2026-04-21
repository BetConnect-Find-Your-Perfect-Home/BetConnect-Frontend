import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; 

const Navbar = () => {
  const { user } = useAuth();

  return (
    <nav className="flex items-center justify-between px-10 h-16 bg-white border-b border-gray-100 sticky top-0 z-50">
      {/* Brand Logo */}
      <Link to="/" className="flex items-center gap-2">
        <div className="w-8 h-8 bg-[#1e3a8a] rounded-lg flex items-center justify-center text-white font-bold">
          B
        </div>
        <span className="text-xl font-bold text-[#1e3a8a]">BetConnect</span>
      </Link>

      {/* Navigation Links */}
      <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
        <Link to="/browse" className="hover:text-[#f97316] transition-colors">Browse Properties</Link>
        <Link to="/ai-chat" className="hover:text-[#f97316] transition-colors">AI Assistant</Link>
      </div>

      {/* Auth State Logic - Matches Figma Layout */}
      <div className="flex items-center gap-4">
        {user ? (
          /* Shown when user is logged in: Profile view instead of buttons */
          <div className="flex items-center gap-3 bg-gray-50 p-1.5 pr-4 rounded-full border border-gray-100">
            <div className="w-8 h-8 bg-[#1e3a8a] rounded-full flex items-center justify-center text-white text-xs font-bold uppercase">
              {user.name?.charAt(0) || 'U'}
            </div>
            <span className="text-sm font-semibold text-[#1e3a8a]">{user.name}</span>
          </div>
        ) : (
          /* Shown only when logged out */
          <>
            <Link to="/login" className="text-sm font-bold text-[#1e3a8a] hover:text-[#f97316] px-4">
              Login
            </Link>
            <Link to="/register" className="bg-[#f97316] text-white px-6 py-2 rounded-xl text-sm font-bold hover:opacity-90 shadow-lg shadow-orange-500/20">
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;