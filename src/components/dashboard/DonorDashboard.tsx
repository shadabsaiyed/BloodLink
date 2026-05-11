import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Droplet, History, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AddDonationForm from "./AddDonationForm";
import DonationHistory from "./DonationHistory";

type DashboardView = "main" | "add-donation" | "history";

const DonorDashboard = () => {
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState<DashboardView>("main");

  const cards = [
    {
      title: "Add Donation Details",
      icon: <Droplet className="h-4 w-4 text-red-600" />,
      buttonText: "Add New Donation",
      view: "add-donation" as DashboardView,
    },
    {
      title: "Donation History",
      icon: <History className="h-4 w-4 text-red-600" />,
      buttonText: "View History",
      view: "history" as DashboardView,
    },
  ];

  const renderContent = () => {
    switch (activeView) {
      case "add-donation":
        return <AddDonationForm onSuccess={() => setActiveView("history")} />;
      case "history":
        return <DonationHistory />;
      default:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {cards.map((card, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
                  {card.icon}
                </CardHeader>
                <CardContent>
                  <Button className="w-full mt-4" variant="outline" onClick={() => setActiveView(card.view)}>
                    {card.buttonText}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        );
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Donor Dashboard</h1>
        <div className="flex gap-2">
          {activeView !== "main" && (
            <Button variant="outline" onClick={() => setActiveView("main")}>Back to Dashboard</Button>
          )}
          <Button variant="outline" onClick={() => navigate("/")} className="flex items-center gap-2">
            <Home className="h-4 w-4" /> Home
          </Button>
        </div>
      </div>
      {renderContent()}
    </div>
  );
};

export default DonorDashboard;
