import React, { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import Navbar from "./navigation/Navbar";
import HeroSection from "./home/HeroSection";
import StatisticsGrid from "./home/StatisticsGrid";
import AuthModal from "./auth/AuthModal";
import { getProfile } from "@/lib/profile";

const Home = () => {
  const { user } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authType, setAuthType] = useState<"donor" | "provider">("donor");
  const [userName, setUserName] = useState("");

  // Load user's first name from profile — reset when user changes
  useEffect(() => {
    setUserName(""); // always clear first to avoid showing stale name from previous user

    const loadName = async () => {
      if (!user) return;
      try {
        const profile = await getProfile(user.uid);
        if (profile?.firstName) {
          setUserName(profile.firstName);
        } else {
          // Fall back to the part before @ in email
          const emailName = user.email?.split("@")[0] || "";
          setUserName(emailName);
        }
      } catch (e) {
        // If profile fetch fails, use email username
        const emailName = user.email?.split("@")[0] || "";
        setUserName(emailName);
      }
    };

    loadName();
  }, [user?.uid]); // re-run when UID changes, not just user object reference

  const handleLogin = () => { setAuthType("donor"); setShowAuthModal(true); };
  const handleDonorSignup = () => { setAuthType("donor"); setShowAuthModal(true); };
  const handleProviderSignup = () => { setAuthType("provider"); setShowAuthModal(true); };

  return (
    <div className="min-h-screen bg-white">
      <Navbar onLogin={handleLogin} onSignup={handleDonorSignup} />
      <main className="pt-20">
        <HeroSection
          onDonorSignup={handleDonorSignup}
          onProviderSignup={handleProviderSignup}
          donorCount={5000}
          livesImpacted={15000}
          userName={userName}
        />
        <StatisticsGrid />
      </main>
      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </div>
  );
};

export default Home;
