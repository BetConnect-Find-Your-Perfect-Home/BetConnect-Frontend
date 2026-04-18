import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

import LandingPage from "./pages/LandingPage";
import BrowsePage from "./pages/BrowsePage";


import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AdminDashboard from './pages/AdminDashboard';
import AgentDashboard from './pages/AgentDashboard';
import UserDashboard from './pages/UserDashboard';
import AgentPayment from './pages/AgentPayment';

import PublicNavbar from './components/layout/PublicNavbar';
import AppShell from './components/layout/AppShell';
import React from "react";
import "./App.css";
function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
         <Route path="/" element={<LandingPage />} />
        <Route path="/browse" element={<BrowsePage />} />
         
          {/* ==================== PUBLIC ROUTES ==================== */}
          <Route 
            path="/login" 
            element={
              <>
                <PublicNavbar />
                <LoginPage />
              </>
            } 
          />

          <Route 
            path="/register" 
            element={
              <>
                <PublicNavbar />
                <RegisterPage />
              </>
            } 
          />

          {/* ==================== PROTECTED ROUTES ==================== */}
          {/* These use AppShell (which includes the logo + user navbar) */}
          
          {/* Admin */}
          <Route path="/admin" element={<AppShell />}>
            <Route index element={<AdminDashboard />} />
          </Route>

          {/* Agent Payment - Must pay first */}
          <Route path="/agent/payment" element={<AppShell />}>
            <Route index element={<AgentPayment />} />
          </Route>

          {/* Agent Dashboard - After payment */}
          <Route path="/agent" element={<AppShell />}>
            <Route index element={<AgentDashboard />} />
          </Route>

          {/* User Dashboard */}
          <Route path="/user" element={<AppShell />}>
            <Route index element={<UserDashboard />} />
          </Route>

          {/* Fallback Route */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;