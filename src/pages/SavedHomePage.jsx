import React, { useState, useEffect } from 'react';
import { Heart, Home, ArrowRight, Trash2, Loader2 } from 'lucide-react';
import PublicNavbar from '../components/layout/PublicNavbar';
import { Link } from 'react-router-dom';
import api from '../services/api';

const SavedHomesPage = () => {
  const [savedProperties, setSavedProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  // Task: Connect to GET /bookmarks
  useEffect(() => {
    const fetchBookmarks = async () => {
      try {
        const response = await api.get('/bookmarks');
        // Assuming your backend returns an array of bookmark objects 
        // where each object contains a 'property' field
        setSavedProperties(response.data || []);
      } catch (err) {
        console.error("Error fetching bookmarks:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookmarks();
  }, []);

  // Task: Handle removing a bookmark
  const removeBookmark = async (id) => {
    try {
      await api.delete(`/bookmarks/${id}`);
      setSavedProperties(prev => prev.filter(item => item.id !== id));
    } catch (err) {
      console.error("Failed to remove bookmark");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin text-brand-orange" size={40} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Note: PublicNavbar is handled by AppShell usually, but keeping it if your routing requires it */}
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-3xl font-bold text-brand-navy">My Saved Homes</h1>
            <p className="text-gray-500 mt-1">You have {savedProperties.length} properties saved</p>
          </div>
        </div>

        {savedProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {savedProperties.map((item) => {
              // Adjust 'item.property' based on your actual Backend API response structure
              const property = item.property || item; 
              
              return (
                <div key={item.id} className="group border border-gray-100 rounded-[24px] overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col">
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={property.image || property.images?.[0]} 
                      alt={property.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <button 
                      onClick={() => removeBookmark(item.id)}
                      className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:bg-red-50 text-brand-orange hover:text-red-500 transition-colors"
                      title="Remove from saved"
                    >
                      <Heart className="fill-current" size={20} />
                    </button>
                  </div>
                  
                  <div className="p-6 flex-1 flex flex-col">
                    <p className="text-brand-orange font-bold text-xl mb-1">
                      {typeof property.price === 'number' ? property.price.toLocaleString() + " ETB" : property.price}
                    </p>
                    <h3 className="text-brand-navy font-bold text-lg mb-2">{property.title}</h3>
                    <p className="text-gray-400 text-sm mb-4">{property.location || property.subcity}</p>
                    
                    <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-50">
                      <span className="text-gray-500 text-[10px] font-bold uppercase tracking-wider">
                        {property.beds || property.specs?.beds} Bed | {property.baths || property.specs?.baths} Bath
                      </span>
                      <Link 
                        to={`/property/${property.id || property._id}`} 
                        className="text-brand-navy font-bold text-sm flex items-center gap-1 hover:text-brand-orange transition-colors"
                      >
                        Details <ArrowRight size={16} />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 bg-gray-50 rounded-[32px] border-2 border-dashed border-gray-200">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-sm mb-6">
              <Home className="text-gray-300" size={40} />
            </div>
            <h2 className="text-2xl font-bold text-brand-navy mb-2">No saved homes yet</h2>
            <p className="text-gray-500 mb-8 text-center max-w-sm">
              Start exploring listings and save your favorites to see them here.
            </p>
            <Link 
              to="/browse" 
              className="px-8 py-4 bg-brand-navy text-white rounded-xl font-bold hover:bg-opacity-90 transition-all shadow-lg shadow-blue-900/10"
            >
              Start Browsing
            </Link>
          </div>
        )}
      </main>
    </div>
  );
};

export default SavedHomesPage;