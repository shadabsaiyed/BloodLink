import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import React from "react";

interface FactProps {
  title: string;
  description: string;
}

const bloodFacts = [
  {
    title: "Did You Know?",
    description: "One blood donation can save up to three lives.",
  },
  {
    title: "Blood Types",
    description:
      "O-negative blood is universal and can be given to any patient.",
  },
  {
    title: "Quick Recovery",
    description: "Your body replaces plasma within 24 hours after donation.",
  },
  {
    title: "Global Need",
    description: "Someone needs blood every two seconds around the world.",
  },
];

const FactCard = ({ title, description }: FactProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <Card className="p-6 bg-white hover:shadow-lg transition-shadow duration-300">
        <h3 className="text-lg font-semibold text-red-600 mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </Card>
    </motion.div>
  );
};

const StatisticsGrid = () => {
  return (
    <div className="w-full bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {bloodFacts.map((fact, index) => (
            <FactCard
              key={index}
              title={fact.title}
              description={fact.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatisticsGrid;
