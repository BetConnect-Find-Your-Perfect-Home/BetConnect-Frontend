import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  MapPin, Heart, ChevronLeft, ChevronRight, 
  Sparkles, Home, CheckCircle, Calendar, Loader2 
} from 'lucide-react';
import PropertySpecs from '../components/property/PropertySpecs';
import AgentCard from '../components/property/AgentCard';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

const PropertyDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchPropertyData = async () => {
      try {
        setLoading(true);
        // TASK: When backend is ready, this will be: 
        // const response = await api.get(`/properties/${id}`);
        // setProperty(response.data);

        // FOR NOW: We use mock data to keep the UI working
        const mockData = {
          id: id,
          title: "Modern G+2 House in Bole",
          location: "Bole, Woreda 03, Kebele 14",
          price: "15,000,000 ETB",
          description: "This stunning G+2 house in the heart of Bole offers modern living with traditional Ethiopian charm. Featuring spacious rooms, high-quality finishes, and a secure environment, it's perfect for a large family or an investment opportunity.",
          images: [
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
          ],
          specs: { beds: "4", baths: "3", size: "350 m²", floor: "G+2" },
          details: { type: "House", status: "Available", yearBuilt: "2022" },
          agent: { name: "Abebe Kebede", phone: "+251 91 234 5678" },
          tags: ["Central Location", "Public Transport", "Parking", "Security"]
        };
        
        setProperty(mockData);
      } catch (error) {
        console.error("Failed to fetch property:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPropertyData();
  }, [id]);

  const toggleBookmark = async () => {
    if (!user) {
      alert("Please login to save properties!");
      return;
    }
    try {
      await api.post('/bookmarks', { propertyId: id });
      setIsBookmarked(!isBookmarked);
    } catch (error) {
      console.error("Error updating bookmark:", error);
    }
  };

  const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % property.images.length);
  const prevImage = () => setCurrentImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <Loader2 className="animate-spin text-brand-orange" size={40} />
    </div>
  );

  if (!property) return <div className="text-center py-20">Property not found</div>;

  return (
    <div className="relative min-h-screen bg-white pb-20">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* 1. IMAGE CAROUSEL SECTION */}
        <div className="relative w-full h-[500px] rounded-[24px] overflow-hidden group mb-8 shadow-lg">
          <img 
            src={property.images[currentImageIndex]} 
            alt={property.title}
            className="w-full h-full object-cover transition-transform duration-700 ease-in-out"
          />
          
          <button 
            onClick={toggleBookmark}
            className="absolute top-6 right-6 p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:scale-110 transition-transform z-10"
          >
            <Heart 
              className={`w-6 h-6 transition-colors ${isBookmarked ? 'fill-brand-orange text-brand-orange' : 'text-gray-400'}`} 
            />
          </button>

          <button onClick={prevImage} className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
            <ChevronLeft className="text-brand-navy" size={24} />
          </button>
          <button onClick={nextImage} className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
            <ChevronRight className="text-brand-navy" size={24} />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h1 className="text-4xl font-bold text-brand-navy mb-2">{property.title}</h1>
                <div className="flex items-center text-gray-500 gap-1">
                  <MapPin size={18} />
                  <span>{property.location}</span>
                </div>
              </div>
              <div className="bg-brand-navy text-white px-4 py-2 rounded-lg font-bold text-sm">FOR SALE</div>
            </div>

            <p className="text-3xl font-extrabold text-brand-orange mt-4 mb-8">{property.price}</p>

            <h3 className="text-xl font-bold text-brand-navy mb-4">Key Features</h3>
            <PropertySpecs 
              bedrooms={property.specs.beds} 
              bathrooms={property.specs.baths} 
              sqM={property.specs.size} 
              floor={property.specs.floor} 
            />

            <div className="mt-10">
              <div className="flex items-center gap-2 mb-4">
                <h3 className="text-xl font-bold text-brand-navy">Description</h3>
                <span className="flex items-center gap-1 bg-brand-orange/10 text-brand-orange px-2 py-0.5 rounded text-[10px] font-bold uppercase border border-brand-orange/20">
                  <Sparkles size={12} /> AI Generated
                </span>
              </div>
              <div className="p-6 bg-gray-50 border border-gray-100 rounded-[20px] text-gray-700 leading-relaxed italic">
                {property.description}
              </div>
            </div>

            <div className="mt-10">
              <h3 className="text-xl font-bold text-brand-navy mb-4">Additional Features</h3>
              <div className="flex flex-wrap gap-3">
                {property.tags.map((tag) => (
                  <span key={tag} className="px-4 py-2 bg-gray-50 border border-gray-100 rounded-full text-sm text-gray-600 font-medium">{tag}</span>
                ))}
              </div>
            </div>

            <div className="mt-10">
              <h3 className="text-xl font-bold text-brand-navy mb-4">Property Details</h3>
              <div className="bg-white border border-gray-100 rounded-[20px] overflow-hidden">
                <div className="flex justify-between items-center p-4 border-b border-gray-50">
                  <span className="text-gray-500 font-medium">Type:</span>
                  <span className="text-brand-navy font-bold">{property.details.type}</span>
                </div>
                <div className="flex justify-between items-center p-4 border-b border-gray-50">
                  <span className="text-gray-500 font-medium">Status:</span>
                  <span className="bg-green-50 text-green-600 px-3 py-1 rounded-md text-xs font-bold border border-green-100">{property.details.status}</span>
                </div>
                <div className="flex justify-between items-center p-4">
                  <span className="text-gray-500 font-medium">Year Built:</span>
                  <span className="text-brand-navy font-bold flex items-center gap-2">
                    <Calendar size={16} className="text-gray-400" /> {property.details.yearBuilt}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <AgentCard 
              agentName={property.agent.name} 
              agentPhone={user ? property.agent.phone : "Login to see phone"} 
              isLoggedIn={!!user}
            />
          </div>
        </div>
      </main>

      <button 
        onClick={() => navigate('/ai-chat')}
        className="fixed bottom-8 right-8 w-14 h-14 bg-brand-orange text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-50 group"
      >
        <Sparkles className="w-6 h-6" />
        <span className="absolute right-16 bg-brand-navy text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Ask AI Assistant
        </span>
      </button>
    </div>
  );
};

export default PropertyDetailsPage;