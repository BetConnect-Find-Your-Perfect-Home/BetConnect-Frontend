import { useAuth } from '../../context/AuthContext';
import { LogOut } from 'lucide-react';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <header className="h-16 bg-white border-b flex items-center px-6 justify-between">
      <h1 className="text-2xl font-bold text-gray-800">
        {user?.role === 'admin' 
          ? 'Admin Portal' 
          : user?.role === 'agent' 
            ? 'Agent Portal' 
            : 'User Portal'}
      </h1>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
            {user?.name ? user.name[0].toUpperCase() : '?'}
          </div>
          <div>
            <p className="font-medium">{user?.name || 'User'}</p>
            <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
          </div>
        </div>

        <button
          onClick={logout}
          className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </header>
  );
}