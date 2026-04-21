import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, Bed, Maximize, Filter } from 'lucide-react';
// Dev 4: Using our mock data until API is ready
import { mockProperties } from '../data/mockProperties';

const BrowsePage = () => {
  const [properties, setProperties] = useState(mockProperties);
  const [price, setPrice] = useState(30000000);
  const [filters, setFilters] = useState({
    subcity: '',
    listingType: '',
    maxPrice: 30000000
  });

  // This currently filters our Mock Data. 
  // When the API is ready, you can uncomment your original useEffect.
  useEffect(() => {
    const filtered = mockProperties.filter(p => {
      const matchesPrice = parseInt(p.price.replace(/[^0-9]/g, '')) <= filters.maxPrice;
      const matchesLocation = filters.subcity === '' || p.location.includes(filters.subcity);
      return matchesPrice && matchesLocation;
    });
    setProperties(filtered);
  }, [filters]);

  return (
    <div className="flex h-[calc(100vh-64px)] bg-gray-50">
      
      {/* SIDEBAR FILTERS - Styled with Brand Navy */}
      <aside className="w-80 bg-white border-r border-gray-200 overflow-y-auto hidden md:block">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-8 text-brand-navy">
            <Filter size={20} />
            <h3 className="text-xl font-bold">Filters</h3>
          </div>
          
          <div className="space-y-6">
            {/* Listing Type */}
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Listing Type</label>
              <select className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-brand-orange/20">
                <option>All Listings</option>
                <option>For Sale</option>
                <option>For Rent</option>
              </select>
            </div>

            {/* Price Range */}
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
                Max Price: <span className="text-brand-orange">{price.toLocaleString()} ETB</span>
              </label>
              <input 
                type="range" 
                className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-brand-orange"
                min="1000000" 
                max="50000000" 
                step="500000"
                value={price}
                onChange={(e) => {
                  setPrice(Number(e.target.value));
                  setFilters(prev => ({ ...prev, maxPrice: Number(e.target.value) }));
                }}
              />
            </div>

            {/* Location */}
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Subcity</label>
              <select 
                onChange={(e) => setFilters(prev => ({ ...prev, subcity: e.target.value }))}
                className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl outline-none"
              >
                <option value="">All Addis</option>
                <option value="Bole">Bole</option>
                <option value="Yeka">Yeka</option>
                <option value="Kazanchis">Kazanchis</option>
              </select>
            </div>

            {/* Bedrooms */}
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Bedrooms</label>
              <div className="grid grid-cols-4 gap-2">
                {['Any', '1+', '2+', '3+'].map((num) => (
                  <button key={num} className="py-2 text-sm border border-gray-100 rounded-lg hover:bg-brand-navy hover:text-white transition-colors">
                    {num}
                  </button>
                ))}
              </div>
            </div>

            <button className="w-full bg-brand-navy text-white py-4 rounded-xl font-bold mt-4 hover:opacity-90 transition-all shadow-lg shadow-blue-900/10">
              Apply Filters
            </button>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 overflow-y-auto p-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold text-brand-navy">
              Search Results <span className="text-gray-400 font-normal">({properties.length})</span>
            </h1>
          </div>

          {/* Property Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {properties.map((p) => (
              <Link 
                key={p.id} 
                to={`/property/${p.id}`}
                className="group bg-white rounded-[24px] overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all flex flex-col"
              >
                <div className="relative h-56 overflow-hidden">
                  <img 
                    src={p.image} 
                    alt={p.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                  />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-brand-navy px-3 py-1 rounded-full text-xs font-bold shadow-sm">
                    {p.floor}
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col">
                  <p className="text-brand-orange font-bold text-xl mb-1">{p.price}</p>
                  <h3 className="text-brand-navy font-bold text-lg mb-2 line-clamp-1">{p.title}</h3>
                  
                  <div className="flex items-center text-gray-400 text-sm gap-1 mb-4">
                    <MapPin size={14} />
                    <span>{p.location}</span>
                  </div>

                  <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between text-gray-500 text-xs font-medium">
                    <div className="flex items-center gap-1">
                      <Bed size={14} className="text-brand-orange" />
                      {p.beds} Beds
                    </div>
                    <div className="flex items-center gap-1">
                      <Maximize size={14} className="text-brand-orange" />
                      {p.size}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default BrowsePage;