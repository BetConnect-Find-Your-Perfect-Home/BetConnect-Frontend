import React from 'react';
import { Bed, Bath, Maximize, Layers } from 'lucide-react';

const PropertySpecs = ({ bedrooms, bathrooms, sqM, floor }) => {
  const specs = [
    { icon: <Bed size={24} />, label: "Bedrooms", value: bedrooms },
    { icon: <Bath size={24} />, label: "Bathrooms", value: bathrooms },
    { icon: <Maximize size={24} />, label: "Square Meters", value: sqM },
    { icon: <Layers size={24} />, label: "Floor", value: floor },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-8">
      {specs.map((spec, index) => (
        <div key={index} className="flex flex-col items-center justify-center p-6 border border-gray-100 rounded-[16px] bg-white shadow-sm">
          <div className="text-brand-navy mb-3">{spec.icon}</div>
          <p className="text-brand-navy font-bold text-lg leading-none">{spec.value}</p>
          <p className="text-gray-400 text-xs mt-1 uppercase tracking-tighter">{spec.label}</p>
        </div>
      ))}
    </div>
  );
};

export default PropertySpecs;