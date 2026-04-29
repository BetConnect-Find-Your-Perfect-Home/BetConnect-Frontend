import React, { useState } from 'react';
import API from '../../services/api';
import { X, Upload, Sparkles, Home, Info, AlignLeft, CheckCircle } from 'lucide-react';

export default function PostPropertyModal({ isOpen, onClose, onRefresh }) {
  const [loading, setLoading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [successData, setSuccessData] = useState(null);
  
  const [formData, setFormData] = useState({
    listingType: 'rent',
    type: 'apartment', 
    subcity: 'Bole',
    woreda: '',
    kebele: '',
    price: '',
    size: '',
    floor: '',
    specialName: '',
    description: '',
    bedrooms: '',
    bathrooms: '',  
  });

  const handleFileChange = (e) => {
    setSelectedFiles([...selectedFiles, ...e.target.files]);
  };

  const removeFile = (index) => {
    setSelectedFiles(selectedFiles.filter((_, i) => i !== index));
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleClose = () => {
    setSuccessData(null);
    setFormData({
      listingType: 'rent',
      type: 'apartment', 
      subcity: 'Bole',
      woreda: '',
      kebele: '',
      price: '',
      size: '',
      floor: '',
      specialName: '',
      description: '',
      bedrooms: '',
      bathrooms: '', 
    });
    setSelectedFiles([]);
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Client-side validation for required fields
    const requiredFields = ['subcity', 'woreda', 'kebele', 'price', 'size', 'floor', 'specialName'];
    const missingFields = requiredFields.filter(field => !formData[field] || formData[field].toString().trim() === '');

    if (missingFields.length > 0) {
      alert(`Please fill in all required fields: ${missingFields.join(', ')}`);
      setLoading(false);
      return;
    }

    try {
      const data = new FormData();
      
      Object.keys(formData).forEach(key => {
        if (formData[key] !== '' && formData[key] !== null && formData[key] !== undefined) {
          data.append(key, formData[key]);
        }
      });

      selectedFiles.forEach(file => {
        data.append('images', file);
      });

      const res = await API.post('/properties', data);

      setSuccessData(res.data);
      onRefresh(); 
    } catch (err) {
      alert(err.response?.data?.message || err.response?.data?.errors?.map(e => e.msg).join(', ') || "Please check all required fields");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  if (successData) {
    return (
      <div className="fixed inset-0 bg-zinc-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-[2.5rem] w-full max-w-lg p-10 text-center relative shadow-[0_8px_40px_rgb(0,0,0,0.12)]">
          <div className="w-24 h-24 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border border-green-100">
            <CheckCircle size={48} />
          </div>
          <h2 className="text-3xl font-black text-gray-900 mb-3 tracking-tight">Property Listed!</h2>
          <p className="text-gray-500 font-medium mb-8 text-[15px]">
            Your property is live. Our AI has generated a professional description below.
          </p>
          
          <div className="bg-blue-50/70 p-6 rounded-2xl border border-blue-100/50 text-left mb-8 shadow-sm relative">
            <p className="text-[11px] font-black text-blue-600 uppercase tracking-widest flex items-center gap-2 mb-3">
              <Sparkles size={14} className="text-blue-500" /> AI Generated Description
            </p>
            <p className="text-gray-700 text-[15px] leading-relaxed italic font-medium">
              "{successData.aiDescription}"
            </p>
          </div>

          <button
            onClick={handleClose}
            className="w-full py-4 bg-gray-900 text-white rounded-2xl font-bold text-lg hover:bg-black hover:scale-[1.02] transition-all shadow-xl active:scale-[0.98]"
          >
            Done
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-zinc-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-[2.5rem] w-full max-w-4xl max-h-[92vh] overflow-y-auto p-8 md:p-12 relative shadow-[0_8px_40px_rgb(0,0,0,0.12)]">
        
        <button onClick={handleClose} className="absolute top-8 right-8 text-gray-400 hover:text-gray-900 bg-gray-50 hover:bg-gray-100 p-2 rounded-full transition-all active:scale-95 shadow-sm border border-gray-100 z-50">
          <X size={28} />
        </button>

        <div className="mb-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg">
               <Home className="text-white" size={22} />
            </div>
            <h2 className="text-3xl font-black text-gray-900 tracking-tight">List a Property</h2>
          </div>
          <p className="text-gray-500 font-medium">This information will be used by our AI to create your listing.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest">Listing Type</label>
              <select name="listingType" value={formData.listingType} onChange={handleChange} className="w-full p-4 rounded-2xl bg-gray-50 border border-gray-100 font-bold outline-none">
                <option value="rent">For Rent</option>
                <option value="sale">For Sale</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest">Property Type</label>
              <select name="type" value={formData.type} onChange={handleChange} className="w-full p-4 rounded-2xl bg-gray-50 border border-gray-100 font-bold outline-none">
                <option value="apartment">Apartment</option>
                <option value="house">House</option>
                <option value="villa">Villa</option>
                <option value="commercial">Commercial</option>
                <option value="studio">Studio</option>
              </select>
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase">Subcity</label>
                <select name="subcity" value={formData.subcity} onChange={handleChange} className="w-full p-3.5 rounded-xl bg-white border border-gray-200 font-semibold outline-none">
                  <option value="Bole">Bole</option>
                  <option value="Yeka">Yeka</option>
                  <option value="Kirkos">Kirkos</option>
                  <option value="Nifas Silk">Nifas Silk</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase">Woreda</label>
                <input name="woreda" type="text" placeholder="e.g. 03" onChange={handleChange} className="w-full p-3.5 rounded-xl bg-white border border-gray-200 outline-none" required />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase">Kebele</label>
                <input name="kebele" type="text" placeholder="e.g. 15" onChange={handleChange} className="w-full p-3.5 rounded-xl bg-white border border-gray-200 outline-none" required />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase flex items-center gap-1">
                <Info size={12} /> Specific Area (specialName)
              </label>
              <input name="specialName" type="text" placeholder="e.g. Near Edna Mall" onChange={handleChange} className="w-full p-4 rounded-xl bg-white border border-gray-200 outline-none" required />
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="md:col-span-2 space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase">Price (ETB)</label>
              <input name="price" type="number" onChange={handleChange} className="w-full p-3.5 rounded-xl border border-gray-200 font-bold text-blue-600 outline-none" required />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase">Size (m²)</label>
              <input name="size" type="number" onChange={handleChange} className="w-full p-3.5 rounded-xl border border-gray-200 outline-none" required />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase">Floor</label>
              <input name="floor" type="text" placeholder="G+1" onChange={handleChange} className="w-full p-3.5 rounded-xl border border-gray-200 outline-none" required />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase">Beds</label>
              <input name="bedrooms" type="number" onChange={handleChange} className="w-full p-3.5 rounded-xl border border-gray-200 outline-none" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase">Baths</label>
              <input name="bathrooms" type="number" onChange={handleChange} className="w-full p-3.5 rounded-xl border border-gray-200 outline-none" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
              <AlignLeft size={14} /> Agent's Notes (description)
            </label>
            <textarea 
              name="description" 
              rows="3" 
              placeholder="Add any extra details like 'Negotiable price', 'Parking included', etc." 
              onChange={handleChange}
              className="w-full p-4 rounded-2xl bg-gray-50 border border-gray-100 focus:bg-white outline-none transition-all"
            ></textarea>
          </div>

          <div className="space-y-4">
            <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest">Property Gallery</label>
            <div className="relative group border-2 border-dashed border-gray-200 rounded-3xl p-10 hover:border-blue-400 hover:bg-blue-50/50 transition-all text-center cursor-pointer bg-gray-50/30">
              <input type="file" multiple onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
              <Upload size={32} className="mx-auto text-gray-400 mb-3 group-hover:text-blue-500 transition-colors" />
              <p className="text-sm font-bold text-gray-500 group-hover:text-blue-600 transition-colors">
                Drop photos here or click to browse
              </p>
              <p className="text-xs font-semibold text-gray-400 mt-2">JPEG, PNG, WEBP</p>
            </div>
            
            {/* Visual Grid for uploaded files */}
            {selectedFiles.length > 0 && (
              <div className="grid grid-cols-4 md:grid-cols-5 gap-3 mt-4">
                {selectedFiles.map((file, index) => (
                  <div key={index} className="relative group rounded-2xl overflow-hidden aspect-square shadow-sm border border-gray-200 bg-white">
                    <img 
                      src={URL.createObjectURL(file)} 
                      alt={`upload-preview-${index}`} 
                      className="w-full h-full object-cover transition-transform group-hover:scale-110" 
                    />
                    <button 
                      type="button" 
                      onClick={(e) => { e.preventDefault(); e.stopPropagation(); removeFile(index); }}
                      className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-all hover:bg-red-600 shadow-md transform hover:scale-110 z-20"
                    >
                      <X size={14} />
                    </button>
                    {/* Add gradient overlay for better button visibility */}
                    <div className="absolute inset-0 bg-linear-to-b from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                  </div>
                ))}
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-5 bg-gray-900 text-white rounded-2xl font-black text-xl hover:bg-black transition-all flex items-center justify-center gap-3 shadow-xl disabled:opacity-50 active:scale-[0.98]"
          >
            {loading ? (
              <>AI is analyzing property...</>
            ) : (
              <><Sparkles size={24} className="text-blue-400" /> List Property</>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}