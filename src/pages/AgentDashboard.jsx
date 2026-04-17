import { useAuth } from '../context/AuthContext';
import { Users, DollarSign, TrendingUp, Award } from 'lucide-react';

export default function AgentDashboard() {
  const { user } = useAuth();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-12">
        <h1 className="text-5xl font-bold text-gray-900 tracking-tight">
          Welcome back, {user?.name?.split(' ')[0] || 'Agent'}!
        </h1>
        <p className="text-xl text-gray-600 mt-3">Your business is growing</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div className="bg-white rounded-3xl p-8 shadow-xl border border-green-100">
          <Users size={48} className="text-green-600 mb-6" />
          <p className="text-5xl font-bold">52</p>
          <p className="text-gray-600 mt-2">Total Clients</p>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-xl border border-emerald-100">
          <DollarSign size={48} className="text-emerald-600 mb-6" />
          <p className="text-5xl font-bold text-emerald-600">$4,850</p>
          <p className="text-gray-600 mt-2">This Month</p>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-xl border border-violet-100">
          <TrendingUp size={48} className="text-violet-600 mb-6" />
          <p className="text-5xl font-bold">23</p>
          <p className="text-gray-600 mt-2">Active Leads</p>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-xl border border-amber-100">
          <Award size={48} className="text-amber-600 mb-6" />
          <p className="text-5xl font-bold">91%</p>
          <p className="text-gray-600 mt-2">Success Rate</p>
        </div>
      </div>

      {/* Attractive CTA Section */}
      <div className="bg-linear-to-br from-blue-600 to-indigo-600 text-white rounded-3xl p-12 text-center">
        <h2 className="text-4xl font-semibold mb-4">Grow Your Business</h2>
        <p className="text-xl opacity-90">Invite more clients and earn higher commissions</p>
      </div>
    </div>
  );
}