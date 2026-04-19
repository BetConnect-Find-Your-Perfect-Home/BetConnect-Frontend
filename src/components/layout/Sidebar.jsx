import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  Home, 
  Users, 
  UserCheck, 
  User, 
  Shield, 
  Sparkles, 
  Building2, 
  Heart, 
  Search,
  LogOut,
  LayoutDashboard
} from 'lucide-react';

export default function Sidebar() {
  const { user, logout } = useAuth();

  const menuConfig = {
    admin: [
      { path: '/admin', label: 'Overview', icon: LayoutDashboard },
      { path: '/admin/agents', label: 'Verify Agents', icon: UserCheck },
      { path: '/browse', label: 'View All Properties', icon: Building2 },
    ],
    agent: [
      { path: '/agent', label: 'Dashboard', icon: Home },
      { path: '/agent/listings', label: 'My Listings', icon: Building2 },
      { path: '/ai-chat', label: 'AI Assistant', icon: Sparkles, isAi: true },
    ],
    user: [
      { path: '/user', label: 'Dashboard', icon: Home },
      { path: '/browse', label: 'Browse Homes', icon: Search },
      { path: '/user/saved', label: 'Saved Homes', icon: Heart },
      { path: '/ai-chat', label: 'AI Smart Search', icon: Sparkles, isAi: true },
    ],
  };

  const menu = user ? menuConfig[user.role] || menuConfig.user : [];

  return (
    <div className="w-72 bg-white dark:bg-zinc-950 border-r border-gray-200 dark:border-zinc-900 h-screen flex-col p-6 hidden lg:flex">
      
      <div className="flex items-center gap-3 mb-10 px-2">
        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
          <Shield className="text-white" size={24} />
        </div>
        <span className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          BetConnect
        </span>
      </div>

      
      <nav className="flex-1 space-y-2">
        {menu.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}

            end={item.path.split('/').length <= 2} 
            className={({ isActive }) => {
              const baseClasses = "flex items-center gap-3 px-4 py-3.5 rounded-2xl text-[14px] font-semibold transition-all duration-200";
              
              if (item.isAi) {
                return isActive 
                  ? `${baseClasses} bg-indigo-600 text-white shadow-lg shadow-indigo-200`
                  : `${baseClasses} bg-indigo-50 text-indigo-700 hover:bg-indigo-100 dark:bg-indigo-900/20 dark:text-indigo-400`;
              }

              return isActive 
                ? `${baseClasses} bg-blue-600 text-white shadow-md shadow-blue-100` 
                : `${baseClasses} hover:bg-gray-100 dark:hover:bg-zinc-900 text-gray-600 dark:text-gray-400`;
            }}
          >
            <item.icon size={20} className={item.isAi ? "animate-pulse" : ""} />
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="pt-6 border-t border-gray-100 dark:border-zinc-900">
        <div className="flex items-center gap-3 px-2 mb-6">
          <div className="w-10 h-10 bg-gray-200 dark:bg-zinc-800 rounded-full overflow-hidden flex items-center justify-center">
             <User size={20} className="text-gray-500" />
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="text-sm font-bold text-gray-900 dark:text-white truncate">{user?.name}</p>
            <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
          </div>
        </div>

        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-[14px] font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors"
        >
          <LogOut size={20} />
          Sign Out
        </button>
      </div>
    </div>
  );
}