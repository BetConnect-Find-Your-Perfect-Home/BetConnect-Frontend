import React from 'react';
import AgentDashboard from '../components/analytics/AgentDashboard';
import AdminDashboard from '../components/analytics/AdminDashboard';

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto space-y-10">
        
        <header>
          <h1 className="text-3xl font-extrabold text-gray-900">Business Analytics</h1>
          <p className="text-gray-500 mt-2">Performance and market trends in Addis</p>
        </header>

        {/* Admin Section */}
        <section>
          <div className="mb-4 border-b border-gray-200 pb-2">
            <h2 className="text-2xl font-bold text-gray-700">Admin Overview</h2>
          </div>
          <AdminDashboard />
        </section>

        {/* Agent Section */}
        <section>
          <div className="mb-4 border-b border-gray-200 pb-2">
            <h2 className="text-2xl font-bold text-gray-700">Agent Performance</h2>
          </div>
          <AgentDashboard />
        </section>

      </div>
    </div>
  );
}