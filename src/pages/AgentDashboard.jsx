import { useState, useEffect } from 'react';
import API from '../services/api';
import PostPropertyModal from '../components/agent/PostPropertyModal';
import AgentPropertyCard from '../components/agent/AgentPropertyCard';
import { Plus, Home, LayoutDashboard, Clock, User, Mail, Phone, MapPin, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function AgentDashboard() {
  const { user } = useAuth();
  const [properties, setProperties] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchMyProperties = async () => {
    if (user?.status === 'pending') {
      setLoading(false);
      return;
    }
    
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
  }, [user]);

  if (loading) {
    return <div className="max-w-7xl mx-auto px-6 py-10 flex justify-center"><p className="text-gray-500 font-bold">Loading dashboard...</p></div>;
  }

  if (user?.status === 'pending') {
    return (
      <div className="max-w-7xl mx-auto px-6 py-24 flex items-center justify-center">
        <div className="bg-yellow-50 border border-yellow-200 rounded-[2rem] p-12 max-w-2xl text-center shadow-sm">
          <div className="bg-yellow-100 text-yellow-600 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xs">
            <Clock size={48} />
          </div>
          <h1 className="text-3xl font-black text-gray-900 mb-4 tracking-tight">Waiting for Admin Approval</h1>
          <p className="text-gray-600 text-lg leading-relaxed font-medium mb-8 px-4">
            Your agent account is currently under review by our administrators. 
            Once approved, you'll be able to access your dashboard and start listing properties.
          </p>
        </div>
      </div>
    );
  }

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
    <div className="max-w-7xl mx-auto px-6 py-10">
      {/* Profile Header */}
      <div className="bg-white rounded-[2.5rem] p-8 md:p-10 mb-12 shadow-[0_2px_20px_rgb(0,0,0,0.03)] border border-gray-100 flex flex-col md:flex-row items-center gap-8 justify-between">
        <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-6">
          <div className="w-24 h-24 bg-blue-50 border border-blue-100 rounded-[1.5rem] flex items-center justify-center text-blue-600 shadow-sm shrink-0">
            <User size={40} />
          </div>
          <div className="pt-2">
            <h1 className="text-4xl font-black text-gray-900 tracking-tight">{user?.name}</h1>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-6 gap-y-2 mt-3 text-[15px] text-gray-500 font-semibold">
              <span className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100"><Mail size={16} className="text-gray-400"/> {user?.email}</span>
              <span className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100"><Phone size={16} className="text-gray-400"/> {user?.phone}</span>
              {user?.personalAddress && <span className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100"><MapPin size={16} className="text-gray-400"/> {user?.personalAddress}</span>}
            </div>
          </div>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 w-full md:w-auto shrink-0 text-white px-8 py-4 rounded-[1.5rem] font-bold text-lg flex items-center justify-center gap-3 hover:bg-blue-700 hover:-translate-y-1 shadow-[0_8px_20px_rgb(37,99,235,0.25)] transition-all"
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

