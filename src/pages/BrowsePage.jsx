import React, { useState, useEffect } from 'react';
import API from '../services/api';
import PropertyCard from '../components/common/PropertyCard';
import { Search, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const BrowsePage = () => {
  const { isAuthenticated } = useAuth();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [price, setPrice] = useState(30000000);
  const [bookmarkedIds, setBookmarkedIds] = useState([]);

  const [filters, setFilters] = useState({
    subcity: '',
    listingType: '',
    type: '',
    maxPrice: 30000000
  });

  const fetchProperties = async () => {
    setLoading(true);
    try {
      const { subcity, listingType, type, maxPrice } = filters;
      const res = await API.get(`/property?subcity=${subcity}&listingType=${listingType}&type=${type}&maxPrice=${maxPrice}`);
      setProperties(res.data?.properties || []);
      
    } catch (err) {
      console.error("Error fetching properties:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, [filters]);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };
 useEffect(() => {
    const fetchData = async () => {
      try {
        const propRes = await API.get('/property');
        setProperties(propRes.data.properties);

        if (isAuthenticated) {
          const favRes = await API.get('/bookmarks/mine');
          const ids = favRes.data.map(b => b.property._id || b.property);
          setBookmarkedIds(ids);
        }
      } catch (err) {
        console.error("Fetch error", err);
      }
    };
    fetchData();
  }, [isAuthenticated]);

  const handleBookmarkToggle = async (propertyId) => {
    const isCurrentlySaved = bookmarkedIds.includes(propertyId);

    try {
      if (isCurrentlySaved) {
        await API.delete(`/bookmarks/${propertyId}`);
        setBookmarkedIds(prev => prev.filter(id => id !== propertyId));
      } else {
        await API.post(`/bookmarks/${propertyId}`);
        setBookmarkedIds(prev => [...prev, propertyId]);
      }
    } catch (err) {
      console.error("Bookmark action failed", err);
    }
  };

  return (
    <div className="w-screen h-[calc(100vh-80px)] flex bg-gray-50">
      
      <aside className="w-80 bg-white border-r border-gray-200 p-8 overflow-y-auto hidden md:block">
        <h3 className="text-xl font-black text-gray-900 mb-8 flex items-center gap-2">
          <Search size={20} className="text-blue-600" /> Filters
        </h3>
        
        <div className="space-y-6">
          <div>
            <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest mb-2">Offer Type</label>
            <select 
              name="listingType" 
              value={filters.listingType} 
              onChange={handleFilterChange}
              className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl font-bold outline-none focus:ring-2 focus:ring-blue-500/10"
            >
              <option value="">All Offers</option>
              <option value="sale">For Sale</option>
              <option value="rent">For Rent</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest mb-2">Property Type</label>
            <select 
              name="type" 
              value={filters.type} 
              onChange={handleFilterChange}
              className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl font-bold outline-none"
            >
              <option value="">All Types</option>
              <option value="house">House</option>
              <option value="apartment">Apartment</option>
              <option value="villa">Villa</option>
              <option value="commercial">Commercial</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest mb-2">Subcity</label>
            <select 
              name="subcity" 
              value={filters.subcity} 
              onChange={handleFilterChange}
              className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl font-bold outline-none"
            >
              <option value="">All Subcities</option>
              <option value="Bole">Bole</option>
              <option value="Yeka">Yeka</option>
              <option value="Arada">Arada</option>
              <option value="Kirkos">Kirkos</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest mb-2">Max Price</label>
            <div className="text-sm font-bold text-blue-600 mb-4">
              Up to {price.toLocaleString()} ETB
            </div>
            <input 
              type="range" 
              className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
              min="0" 
              max="30000000" 
              step="100000"
              value={price}
              onChange={(e) => {
                setPrice(Number(e.target.value));
              }}
              onMouseUp={() => setFilters(prev => ({ ...prev, maxPrice: price }))}
            />
          </div>

          <button 
            onClick={() => setFilters({ subcity: '', listingType: '', type: '', maxPrice: 30000000 })}
            className="w-full py-3 text-gray-400 font-bold text-sm hover:text-red-500 transition-colors"
          >
            Clear All Filters
          </button>
        </div>
      </aside>

      <main className="flex-1 p-8 md:p-12 overflow-y-auto">
        
        <div className="mb-10 flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-black text-gray-900 tracking-tight">Available Properties</h1>
            <p className="text-gray-500 font-medium">Found {properties.length} results matching your search</p>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center h-96 text-gray-400">
            <Loader2 className="animate-spin mb-4" size={40} />
            <p className="font-bold">Updating listings...</p>
          </div>
        ) : properties.length === 0 ? (
          <div className="bg-white rounded-4xl p-20 text-center border border-gray-100 shadow-sm">
            <p className="text-gray-400 font-bold text-xl">No properties found with these filters.</p>
            <button 
               onClick={() => setFilters({ subcity: '', listingType: '', type: '', maxPrice: 30000000 })}
               className="mt-4 text-blue-600 font-bold hover:underline"
            >
              Reset all filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {properties.map((house) => (
              <PropertyCard 
                key={house._id} 
                property={house} 
                isBookmarked={bookmarkedIds.includes(house._id)}
                onBookmarkToggle={handleBookmarkToggle}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default BrowsePage;