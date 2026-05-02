import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Bed, Bath, Maximize, MapPin } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function PropertyCard({ property, isBookmarked, onBookmarkToggle }) {

  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const getImageUrl = () => {
    if (!property.images || property.images.length === 0) {
      return 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=800'; 
    }

    const firstImage = property.images[0];

    if (firstImage.startsWith('http')) return firstImage;

    const cleanPath = firstImage.replace(/\\/g, '/'); 
    
     const backendBase = import.meta.env.PROD 
    ? import.meta.env.VITE_IMAGE_API_URL 
    : "http://localhost:5000";

    return `${backendBase}/${cleanPath}`;
  };

  const imageUrl = getImageUrl();
  
  const handleBookmarkClick = (e) => {
    e.preventDefault(); 
    e.stopPropagation();
    
    if (!isAuthenticated) {
      alert("Please login to save properties!");
      navigate('/login');
      return;
    }
    
    onBookmarkToggle(property._id);
  };

  return (
    <div 
      onClick={() => navigate(`/property/${property._id}`)} 
      className="bg-white rounded-4xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 group overflow-hidden cursor-pointer"
    >
      <div className="relative h-64 overflow-hidden">
        <img src={imageUrl} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="home" />
        
        <div className={`absolute top-4 left-4 px-4 py-1.5 rounded-xl text-xs font-black uppercase text-white ${property.listingType === 'sale' ? 'bg-[#0B3B60]' : 'bg-[#F2994A]'}`}>
          For {property.listingType}
        </div>

        <button 
          onClick={handleBookmarkClick}
          className="absolute top-4 right-4 w-11 h-11 bg-white/90 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-md hover:bg-white transition-all active:scale-90 z-10"
        >
          <Heart 
            size={22} 
            className={`transition-colors ${isBookmarked ? "fill-red-500 text-red-500" : "text-gray-400"}`} 
          />
        </button>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 truncate">{property.type} in {property.subcity}</h3>
        <p className="text-2xl font-black text-[#0B3B60] mt-2">{property.price?.toLocaleString()} ETB</p>
        <div className="flex items-center gap-1 text-gray-400 text-sm mt-2"><MapPin size={14} /><span>{property.subcity}, Woreda {property.woreda}</span></div>
      </div>
    </div>
  );
}