import { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/home";
import DonorDashboard from "./components/dashboard/DonorDashboard";
import OrganizationDashboard from "./components/dashboard/OrganizationDashboard";
import ProfilePage from "./components/dashboard/ProfilePage";
import Mission from "./components/about/Mission";
import HowItWorks from "./components/about/HowItWorks";
import Impact from "./components/about/Impact";
import DonatePage from "./components/donate/DonatePage";
import DonationCentersPage from "./components/donate/DonationCentersPage";
import ContactPage from "./components/contact/ContactPage";
import { useAuth } from "./contexts/AuthContext";

function App() {
  const { user, userType } = useAuth();
  const DashboardComponent = userType === "organization" ? OrganizationDashboard : DonorDashboard;

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about/mission" element={<Mission />} />
          <Route path="/about/how-it-works" element={<HowItWorks />} />
          <Route path="/about/impact" element={<Impact />} />
          <Route path="/donate" element={<DonatePage />} />
          <Route path="/donation-centers" element={<DonationCentersPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/dashboard" element={user ? <DashboardComponent /> : <Navigate to="/" replace />} />
          <Route path="/profile" element={user ? <ProfilePage /> : <Navigate to="/" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Suspense>
  );
}

export default App;
