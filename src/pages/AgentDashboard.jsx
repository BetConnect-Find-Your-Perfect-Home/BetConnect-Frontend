import { useState, useEffect } from 'react';
import API from '../services/api';
import PostPropertyModal from '../components/agent/PostPropertyModal';
import { Plus, Home, LayoutDashboard } from 'lucide-react';

export default function AgentDashboard() {
  const [properties, setProperties] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchMyProperties = async () => {
    try {

      const res = await API.get('/properties/mine'); 
      setProperties(res.data);
    } catch (err) {
      console.error("Error fetching properties");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyProperties();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="flex justify-between items-center mb-12">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">Agent Dashboard</h1>
          <p className="text-gray-500 mt-1">Manage your listings and generate AI descriptions</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all"
        >
          <Plus size={20} /> Post New Property
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