import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Home, Users, UserCheck, User, Shield, X } from 'lucide-react';

export default function Sidebar() {
  const { user } = useAuth();

  const menuConfig = {
    admin: [
      { path: '/admin', label: 'Dashboard', icon: Home },
      { path: '/admin/agents', label: 'Pending Agents', icon: UserCheck },
    ],
    agent: [
      { path: '/agent', label: 'Dashboard', icon: Home },
      { path: '/agent/clients', label: 'My Clients', icon: Users },
    ],
    user: [
      { path: '/user', label: 'Dashboard', icon: Home },
      { path: '/user/profile', label: 'My Profile', icon: User },
    ],
  };

  const menu = user ? menuConfig[user.role] || menuConfig.user : [];

  return (
    <div className="w-72 bg-white dark:bg-zinc-900 border-r border-gray-200 dark:border-zinc-800 h-full p-6 hidden lg:block overflow-y-auto">
      <div className="flex items-center gap-3 mb-12">
        <Shield className="text-blue-600" size={36} />
        <span className="text-3xl font-bold tracking-tighter">BetConnect</span>
      </div>

      <nav className="space-y-1">
        {menu.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-5 py-3.5 rounded-2xl text-[15px] font-medium transition-all ${
                isActive 
                  ? 'bg-blue-600 text-white shadow-md' 
                  : 'hover:bg-gray-100 dark:hover:bg-zinc-800 text-gray-700 dark:text-gray-300'
              }`
            }
          >
            <item.icon size={22} />
            {item.label}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}