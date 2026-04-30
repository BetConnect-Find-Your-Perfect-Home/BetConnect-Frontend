import { useState, useEffect } from 'react';
import API from '../services/api';
import PostPropertyModal from '../components/agent/PostPropertyModal';
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
      const res = await API.get('/properties/mine'); 
      setProperties(res.data);
    } catch (err) {
      console.error("Error fetching properties", err);
    } finally {
      setLoading(false);
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

  return (
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
      

      {/* Properties List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {properties.length === 0 ? (
          <div className="col-span-full py-20 text-center border-2 border-dashed rounded-3xl border-gray-200">
             <Home size={48} className="mx-auto text-gray-300 mb-4" />
             <p className="text-gray-500">You haven't posted any properties yet.</p>
          </div>
        ) : (
          properties.map(item => (
            <div key={item._id} className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-lg text-xs font-bold uppercase">
                    {item.listingType}
                  </span>
                  <p className="text-xl font-bold text-gray-900">{item.price.toLocaleString()} ETB</p>
                </div>
                <h3 className="font-bold text-lg mb-1">{item.type} in {item.subcity}</h3>
                <p className="text-sm text-gray-500 mb-4">Woreda {item.woreda}, Kebele {item.kebele}</p>
                
                {/* AI GENERATED CONTENT */}
                <div className="bg-gray-50 p-4 rounded-xl border border-blue-100">
                  <p className="text-xs font-bold text-blue-600 flex items-center gap-1 mb-1">
                    <Sparkles size={12} /> AI GENERATED DESCRIPTION
                  </p>
                  <p className="text-sm text-gray-700 leading-relaxed italic">
                    "{item.aiDescription}"
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <PostPropertyModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onRefresh={fetchMyProperties}
      />
    </div>
  );
}

