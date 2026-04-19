import React, { useState } from 'react';
import API from '../../services/api';
import { X, Upload, Sparkles } from 'lucide-react';

export default function PostPropertyModal({ isOpen, onClose, onRefresh }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    listingType: 'rent',
    type: 'Apartment',
    subcity: 'Bole',
    woreda: '',
    kebele: '',
    price: '',
    size: '',
    floor: '',
    specialName: '',
    bedrooms: 1,
    bathrooms: 1,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await API.post('/properties', formData);
      alert(" Success! AI has generated a description for your property.");
      onRefresh(); 
      onClose();   
    } catch (err) {
      alert(err.response?.data?.message || "Failed to post property");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-8 relative">
        <button onClick={onClose} className="absolute top-6 right-6 text-gray-400 hover:text-gray-600">
          <X size={24} />
        </button>

        <h2 className="text-3xl font-bold mb-6">Post New Property</h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Basic Info */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-600">Listing Type</label>
            <select 
              className="w-full p-3 rounded-xl border border-gray-200"
              value={formData.listingType}
              onChange={(e) => setFormData({...formData, listingType: e.target.value})}
            >
              <option value="rent">For Rent</option>
              <option value="sale">For Sale</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-600">Property Type</label>
            <select 
              className="w-full p-3 rounded-xl border border-gray-200"
              value={formData.type}
              onChange={(e) => setFormData({...formData, type: e.target.value})}
            >
              <option value="Apartment">Apartment</option>
              <option value="House">House</option>
              <option value="Villa">Villa</option>
              <option value="Commercial">Commercial</option>
            </select>
          </div>

          
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-600">Subcity</label>
            <select 
              className="w-full p-3 rounded-xl border border-gray-200"
              value={formData.subcity}
              onChange={(e) => setFormData({...formData, subcity: e.target.value})}
            >
              <option value="Bole">Bole</option>
              <option value="Yeka">Yeka</option>
              <option value="Nifas Silk">Nifas Silk</option>
              <option value="Kirkos">Kirkos</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-600">Woreda / Kebele</label>
            <div className="flex gap-2">
              <input 
                type="text" placeholder="Woreda" className="w-1/2 p-3 rounded-xl border border-gray-200"
                onChange={(e) => setFormData({...formData, woreda: e.target.value})} required
              />
              <input 
                type="text" placeholder="Kebele" className="w-1/2 p-3 rounded-xl border border-gray-200"
                onChange={(e) => setFormData({...formData, kebele: e.target.value})} required
              />
            </div>
          </div>

          <div className="md:col-span-2 space-y-2">
            <label className="text-sm font-semibold text-gray-600">Specific Area Name (e.g. Near Edna Mall)</label>
            <input 
              type="text" className="w-full p-3 rounded-xl border border-gray-200"
              onChange={(e) => setFormData({...formData, specialName: e.target.value})}
            />
          </div>

          {/* Specs */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-600">Price (ETB)</label>
            <input 
              type="number" className="w-full p-3 rounded-xl border border-gray-200"
              onChange={(e) => setFormData({...formData, price: e.target.value})} required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-600">Floor (e.g. G+2 or 5th Floor)</label>
            <input 
              type="text" className="w-full p-3 rounded-xl border border-gray-200"
              onChange={(e) => setFormData({...formData, floor: e.target.value})}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="md:col-span-2 w-full py-4 bg-blue-600 text-white rounded-2xl font-bold text-lg hover:bg-blue-700 transition flex items-center justify-center gap-2"
          >
            {loading ? "AI is generating description..." : <><Sparkles size={20} /> Post Property</>}
          </button>
        </form>
      </div>
    </div>
  );
}