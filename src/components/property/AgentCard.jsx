import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext'; // Path based on your structure
import { Phone, Lock, User } from 'lucide-react';

const AgentCard = ({ agentName, agentPhone }) => {
  const { user } = useContext(AuthContext); // Assuming user exists when logged in
  const isAuthenticated = !!user;

  return (
    <div className="bg-white p-6 rounded-[24px] border border-gray-100 shadow-sm sticky top-24">
      <h3 className="text-brand-navy font-semibold mb-4 text-sm uppercase tracking-wider">Agent Contact</h3>
      
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 bg-brand-navy rounded-full flex items-center justify-center text-white font-bold text-lg">
          {agentName?.charAt(0) || 'A'}
        </div>
        <div>
          <p className="font-bold text-brand-navy text-lg">{agentName}</p>
          <p className="text-gray-500 text-sm">Licensed Agent</p>
        </div>
      </div>

      <div className="h-[1px] bg-gray-100 w-full mb-6" />

      {isAuthenticated ? (
        /* REGISTERED USER VIEW */
        <div className="space-y-4">
          <div className="flex items-center gap-3 text-brand-navy">
            <Phone size={18} />
            <span className="font-medium text-lg">{agentPhone}</span>
          </div>
          <button className="w-full py-4 bg-brand-orange text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-all">
            <Phone size={20} fill="white" />
            Call Agent
          </button>
        </div>
      ) : (
        /* GUEST USER VIEW */
        <div className="space-y-4">
          <div className="relative bg-gray-50 p-6 rounded-xl flex flex-col items-center justify-center text-center">
            <Lock className="text-gray-400 mb-2" size={32} />
            <p className="text-brand-navy font-bold text-sm mb-1">Contact information is protected</p>
            <p className="text-gray-500 text-xs leading-tight">
              Please register or log in to view agent contact details
            </p>
            {/* Blurred placeholder phone number */}
            <p className="mt-3 text-gray-300 blur-[4px] select-none text-lg">+251 91 *** ****</p>
          </div>
          
          <button className="w-full py-4 bg-brand-navy text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-opacity-90 transition-all">
            <User size={20} />
            Register / Login to View Contact
          </button>
        </div>
      )}
    </div>
  );
};

export default AgentCard;