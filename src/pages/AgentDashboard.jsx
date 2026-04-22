import { useState, useEffect } from 'react';
import API from '../services/api';
import PostPropertyModal from '../components/agent/PostPropertyModal';
import AgentPropertyCard from '../components/agent/AgentPropertyCard';
import { Plus, Home, LayoutDashboard, Building2, CheckCircle, Clock } from 'lucide-react';

export default function AgentDashboard() {
  const [properties, setProperties] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchMyProperties = async () => {
    try {
      const res = await API.get('/property/mine'); 
      setProperties(res.data);
    } catch (err) {
      console.error("Error fetching properties", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this listing?")) {
      try {
        await API.delete(`/property/${id}`);
        setProperties(prev => prev.filter(p => p._id !== id));
      } catch (err) {
        alert("Failed to delete property");
      }
    }
  };

  useEffect(() => {
    fetchMyProperties();
  }, []);

  if (loading) return <div className="p-20 text-center animate-pulse font-bold text-gray-400">Loading your listings...</div>;

  return (
    <div className="max-w-7xl mx-auto px-6 py-4">
      {/* 1. Header with Post Button */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h1 className="text-4xl font-black text-gray-900 tracking-tight">Agent Dashboard</h1>
          <p className="text-gray-500 font-medium mt-1">Manage your property portfolio and AI insights.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-black flex items-center gap-3 shadow-xl shadow-blue-200 transition-all active:scale-95"
        >
          <Plus size={24} /> Post New Property
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white p-6 rounded-4xl border border-gray-100 flex items-center gap-5 shadow-xs">
          <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
            <Building2 size={28} />
          </div>
          <div>
            <p className="text-2xl font-black text-gray-900">{properties.length}</p>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Total Listings</p>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-4xl border border-gray-100 flex items-center gap-5 shadow-xs">
          <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center">
            <CheckCircle size={28} />
          </div>
          <div>
            <p className="text-2xl font-black text-gray-900">{properties.filter(p => p.status === 'available').length}</p>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Active Listings</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-4xl border border-gray-100 flex items-center gap-5 shadow-xs">
          <div className="w-14 h-14 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center">
            <Clock size={28} />
          </div>
          <div>
            <p className="text-2xl font-black text-gray-900">0</p>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Pending Requests</p>
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Properties</h2>
      {properties.length === 0 ? (
        <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-[3rem] py-24 text-center">
           <Home size={64} className="mx-auto text-gray-300 mb-4" />
           <p className="text-gray-500 font-bold text-xl">No properties listed yet.</p>
           <button onClick={() => setIsModalOpen(true)} className="text-blue-600 font-bold hover:underline mt-2">
             Click here to add your first house
           </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map(item => (
            <AgentPropertyCard 
              key={item._id} 
              property={item} 
              onDelete={handleDelete} 
            />
          ))}
        </div>
      )}

      <PostPropertyModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onRefresh={fetchMyProperties}
      />
    </div>
  );
}