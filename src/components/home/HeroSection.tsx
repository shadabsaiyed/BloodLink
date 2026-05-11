import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Heart, Users, Droplet, LayoutDashboard, UserCircle } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  donorCount?: number;
  livesImpacted?: number;
  onDonorSignup?: () => void;
  onProviderSignup?: () => void;
  userName?: string;
}

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  if (hour < 21) return "Good evening";
  return "Good night";
};

const HeroSection = ({
  donorCount = 5000,
  livesImpacted = 15000,
  onDonorSignup = () => {},
  onProviderSignup = () => {},
  userName = "",
}: HeroSectionProps) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const greeting = getGreeting();

  const displayName = userName || user?.displayName || user?.email?.split("@")[0] || "there";

  return (
    <div className="relative min-h-[600px] w-full overflow-hidden bg-gradient-to-br from-rose-50 via-white to-pink-50">
      {/* Soft decorative blobs */}
      <div className="absolute top-10 right-10 w-80 h-80 bg-rose-200 rounded-full filter blur-3xl opacity-30 animate-pulse" />
      <div className="absolute bottom-0 left-10 w-72 h-72 bg-pink-200 rounded-full filter blur-3xl opacity-25" />

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">

          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex-1 max-w-2xl"
          >
            {user ? (
              /* ── LOGGED IN STATE ── */
              <>
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <p className="text-rose-500 font-semibold text-lg mb-1 tracking-wide">
                    🌟 {greeting}
                  </p>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 capitalize">
                    Hello, {displayName}!
                  </h1>
                  <p className="text-xl text-gray-500 mb-8 leading-relaxed">
                    Thank you for being a life-saving hero. Every donation you make creates a ripple of hope for someone in need. 🩸
                  </p>
                </motion.div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    size="lg"
                    onClick={() => navigate("/dashboard")}
                    className="bg-rose-600 hover:bg-rose-700 text-white shadow-lg shadow-rose-200"
                  >
                    <LayoutDashboard className="mr-2 h-5 w-5" />
                    Go to Dashboard
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={() => navigate("/profile")}
                    className="border-rose-300 text-rose-600 hover:bg-rose-50"
                  >
                    <UserCircle className="mr-2 h-5 w-5" />
                    View Profile
                  </Button>
                </div>
              </>
            ) : (
              /* ── LOGGED OUT STATE ── */
              <>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                  Every Drop <span className="text-rose-600">Counts</span>
                </h1>
                <p className="text-xl text-gray-500 mb-8 leading-relaxed">
                  Join our network of heroes and make a difference in someone's life today.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    size="lg"
                    onClick={onDonorSignup}
                    className="bg-rose-600 hover:bg-rose-700 text-white shadow-lg shadow-rose-200"
                  >
                    Become a Donor
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={onProviderSignup}
                    className="border-rose-400 text-rose-600 hover:bg-rose-50"
                  >
                    Healthcare Provider
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </>
            )}
          </motion.div>

          {/* Right content - Stat Cards */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            <StatCard icon={<Users className="h-8 w-8 text-rose-500" />} value={donorCount.toLocaleString()} label="Active Donors" color="from-rose-50 to-pink-50" />
            <StatCard icon={<Heart className="h-8 w-8 text-rose-500" />} value={livesImpacted.toLocaleString()} label="Lives Impacted" color="from-pink-50 to-rose-50" />
            <StatCard icon={<Droplet className="h-8 w-8 text-rose-500" />} value="24/7" label="Available Support" color="from-rose-50 to-pink-50" />
            <StatCard icon={<Heart className="h-8 w-8 text-rose-500" />} value="100%" label="Satisfaction Rate" color="from-pink-50 to-rose-50" />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

interface StatCardProps {
  icon: React.ReactNode;
  value: string;
  label: string;
  color: string;
}

const StatCard = ({ icon, value, label, color }: StatCardProps) => (
  <motion.div
    whileHover={{ scale: 1.05, y: -4 }}
    transition={{ type: "spring", stiffness: 300 }}
    className={`bg-gradient-to-br ${color} border border-rose-100 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow`}
  >
    <div className="mb-4">{icon}</div>
    <div className="text-2xl font-bold text-gray-800 mb-1">{value}</div>
    <div className="text-sm text-gray-500">{label}</div>
  </motion.div>
);

export default HeroSection;
