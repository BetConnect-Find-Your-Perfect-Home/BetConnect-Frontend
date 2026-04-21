import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

// Layouts
import PublicNavbar from './components/layout/PublicNavbar';
import DashboardLayout from './components/layout/DashboardLayout';

// Pages
import LandingPage from "./pages/LandingPage";
import BrowsePage from "./pages/BrowsePage";
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AdminDashboard from './pages/AdminDashboard';
import AgentDashboard from './pages/AgentDashboard';
import UserDashboard from './pages/UserDashboard';
import AgentPayment from './pages/AgentPayment';
import AIChatPage from './pages/AIChatPage';

// Dev 4 New Pages
import PropertyDetailsPage from './pages/PropertyDetailsPage';
import SavedHomesPage from './pages/SavedHomesPage';

// Auth Components
import RoleGate from './components/auth/RoleGate';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          
          {/* ==================== 1. PUBLIC ROUTES ==================== */}
          {/* Using fragments to wrap PublicNavbar with the page content */}
          <Route path="/" element={<><PublicNavbar /><LandingPage /></>} />
          <Route path="/browse" element={<><PublicNavbar /><BrowsePage /></>} />
          <Route path="/login" element={<><PublicNavbar /><LoginPage /></>} />
          <Route path="/register" element={<><PublicNavbar /><RegisterPage /></>} />
          
          {/* Dev 4: Public access to Property Details & Saved Homes */}
          <Route path="/property/:id" element={<><PublicNavbar /><PropertyDetailsPage /></>} />
          <Route path="/saved" element={<><PublicNavbar /><SavedHomesPage /></>} />

          {/* ==================== 2. PROTECTED DASHBOARDS ==================== */}
          {/* DashboardLayout includes the Dashboard Navbar (Welcome back, [Name]) and Sidebar */}
          <Route element={<DashboardLayout />}>
            
            <Route path="/ai-chat" element={<AIChatPage />} />

            {/* Admin Only - Portal for AASTU System Admins */}
            <Route element={<RoleGate allowedRoles={['admin']} />}>
              <Route path="/admin" element={<AdminDashboard />} />
            </Route>

            {/* Agent Only - Portal for Property Listing Management */}
            <Route element={<RoleGate allowedRoles={['agent']} />}>
              <Route path="/agent" element={<AgentDashboard />} />
              <Route path="/agent/payment" element={<AgentPayment />} />
            </Route>

            {/* User Only - Consumer Portal */}
            <Route element={<RoleGate allowedRoles={['user']} />}>
              <Route path="/user" element={<UserDashboard />} />
              {/* Dev 4: Accessing bookmarks from inside the User Portal */}
              <Route path="/user/saved" element={<SavedHomesPage />} />
            </Route>

          </Route>

          {/* Catch-all: Redirect unknown paths to landing page */}
          <Route path="*" element={<Navigate to="/" replace />} />
          
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;