import React from "react";
import { motion } from "framer-motion";

interface FactProps {
  title: string;
  description: string;
  emoji: string;
}

const bloodFacts = [
  { emoji: "💡", title: "Did You Know?", description: "One blood donation can save up to three lives." },
  { emoji: "🩸", title: "Blood Types", description: "O-negative blood is universal and can be given to any patient." },
  { emoji: "⚡", title: "Quick Recovery", description: "Your body replaces plasma within 24 hours after donation." },
  { emoji: "🌍", title: "Global Need", description: "Someone needs blood every two seconds around the world." },
];

const FactCard = ({ title, description, emoji }: FactProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    whileHover={{ y: -4 }}
    viewport={{ once: true }}
    className="bg-white border border-rose-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all"
  >
    <div className="text-3xl mb-3">{emoji}</div>
    <h3 className="text-lg font-semibold text-rose-600 mb-2">{title}</h3>
    <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
  </motion.div>
);

const StatisticsGrid = () => (
  <div className="w-full bg-gradient-to-b from-white to-rose-50 py-16 px-4">
    <div className="max-w-7xl mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-2xl font-bold text-center text-gray-800 mb-10"
      >
        Why Donate Blood?
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {bloodFacts.map((fact, index) => (
          <FactCard key={index} {...fact} />
        ))}
      </div>
    </div>
  </div>
);

export default StatisticsGrid;
