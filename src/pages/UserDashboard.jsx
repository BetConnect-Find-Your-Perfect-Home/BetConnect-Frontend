import { useAuth } from '../context/AuthContext';
import { Trophy, TrendingUp, Calendar, Users, PlayCircle, HomeIcon } from 'lucide-react';

export default function UserDashboard() {
  const { user } = useAuth();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-12">
        <h1 className="text-5xl font-bold text-gray-900 tracking-tight">
          Welcome back, {user?.name?.split(' ')[0] || 'Champion'}! 👋
        </h1>
        <p className="text-xl text-gray-600 mt-3">Ready to win today?</p>
      </div>

      {/* Hero Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-linear-to-br from-blue-600 to-indigo-600 text-white rounded-3xl p-8 shadow-xl">
          <HomeIcon size={48} className="mb-6" />
          <p className="text-5xl font-bold">14</p>
          <p className="text-blue-100 mt-2">recent view</p>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
          < HomeIcon size={48} className="text-green-600 mb-6" />
          <p className="text-5xl font-bold text-green-600">84</p>
          <p className="text-gray-600 mt-2">rental</p>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
          < HomeIcon size={48} className="text-purple-600 mb-6" />
          <p className="text-5xl font-bold">9</p>
          <p className="text-gray-600 mt-2">for sell</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-3xl p-10 shadow-xl">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-semibold">Apartments</h2>
          <button className="flex items-center gap-3 bg-linear-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-2xl font-semibold hover:scale-105 transition">
            <PlayCircle size={24} />
            see more
          </button>
        </div>
      </div>
    </div>
  );
}