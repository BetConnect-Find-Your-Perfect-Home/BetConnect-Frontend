import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

// Import CSS for the 'app' and 'card' styling
import "./App.css"; 

// Page Imports
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AdminDashboard from './pages/AdminDashboard';
import AgentDashboard from './pages/AgentDashboard';
import UserDashboard from './pages/UserDashboard';
import AgentPayment from './pages/AgentPayment';

// Layout and Component Imports
import PublicNavbar from './components/layout/PublicNavbar';
import AppShell from './components/layout/AppShell';
import ReportListing from './components/layout/ReportListing';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* ==================== PUBLIC ROUTES ==================== */}
          <Route path="/login" element={<><PublicNavbar /><LoginPage /></>} />
          <Route path="/register" element={<><PublicNavbar /><RegisterPage /></>} />

          {/* ==================== PROTECTED ROUTES ==================== */}
          <Route path="/admin" element={<AppShell />}><Route index element={<AdminDashboard />} /></Route>
          <Route path="/agent" element={<AppShell />}><Route index element={<AgentDashboard />} /></Route>
          <Route path="/user" element={<AppShell />}><Route index element={<UserDashboard />} /></Route>

          {/* ==================== THE REPORT ROUTER ==================== */}
          {/* Fixed: This is now INSIDE the Routes block */}
          <Route path="/report/:id" element={<AppShell />}>
            <Route 
              index 
              element={
                <div className="app">
                  <div className="card">
                    <h1 className="top-title">
                      Connecting to database... No properties to display yet.
                    </h1>
                    <ReportListing />
                  </div>
                </div>
              } 
            />
          </Route>

          {/* Fallback Route */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;