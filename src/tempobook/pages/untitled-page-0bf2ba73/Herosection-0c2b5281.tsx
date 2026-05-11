import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Heart, Users, Droplet } from "lucide-react";
import React from "react";

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  donorCount?: number;
  livesImpacted?: number;
  onDonorSignup?: () => void;
  onProviderSignup?: () => void;
}

const HeroSection = ({
  title = "Give the Gift of Life",
  subtitle = "Join our community of blood donors and help save lives today",
  donorCount = 5000,
  livesImpacted = 15000,
  onDonorSignup = () => {},
  onProviderSignup = () => {},
}: HeroSectionProps) => {
  return (
    <div className="relative min-h-[600px] w-full bg-white overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-50 to-white">
        <div className="w-[69px] h-[39px]"></div>
      </div>
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex-1 max-w-2xl"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              {title}
            </h1>
            <p className="text-xl text-gray-600 mb-8">{subtitle}</p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                onClick={onDonorSignup}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                Become a Donor
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={onProviderSignup}
                className="border-red-600 text-red-600 hover:bg-red-50"
              >
                Healthcare Provider
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </motion.div>

          {/* Right content - Statistics */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            <StatCard
              icon={<Users className="h-8 w-8 text-red-600" />}
              value={donorCount.toLocaleString()}
              label="Active Donors"
            />
            <StatCard
              icon={<Heart className="h-8 w-8 text-red-600" />}
              value={livesImpacted.toLocaleString()}
              label="Lives Impacted"
            />
            <StatCard
              icon={<Droplet className="h-8 w-8 text-red-600" />}
              value="24/7"
              label="Available Support"
            />
            <StatCard
              icon={
                <Heart className="h-8 w-8 text-red-600">
                  <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
                    99.9%
                  </h1>
                </Heart>
              }
              value="100%"
              label="Satisfaction Rate"
            />
          </motion.div>
        </div>
      </div>
      {/* Decorative elements */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 1 }}
        className="absolute top-20 right-0 w-72 h-72 bg-red-600 rounded-full filter blur-3xl"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="absolute bottom-0 left-20 w-72 h-72 bg-red-600 rounded-full filter blur-3xl"
      />
    </div>
  );
};

interface StatCardProps {
  icon: React.ReactNode;
  value: string;
  label: string;
}

const StatCard = ({ icon, value, label }: StatCardProps) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg"
  >
    <div className="mb-4">{icon}</div>
    <div className="text-2xl font-bold text-gray-900 mb-1">{value}</div>
    <div className="text-sm text-gray-600">{label}</div>
  </motion.div>
);

export default HeroSection;
