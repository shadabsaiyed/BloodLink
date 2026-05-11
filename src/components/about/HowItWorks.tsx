import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Home } from "lucide-react";

const steps = [
  { title: "Sign Up", description: "Create an account as a donor or healthcare provider." },
  { title: "Complete Profile", description: "Add your blood type and other relevant medical information." },
  { title: "Find Donation Centers", description: "Locate nearby donation centers or blood drives." },
  { title: "Schedule Donation", description: "Book your preferred time slot for donation." },
  { title: "Donate Blood", description: "Visit the center and complete your donation." },
  { title: "Track Impact", description: "Monitor your donation history and lives impacted." },
];

const HowItWorks = () => {
  const navigate = useNavigate();
  return (
    <div className="container mx-auto py-20 px-4">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-3xl font-bold text-center flex-1">How It Works</CardTitle>
            <Button variant="outline" onClick={() => navigate("/")} className="flex items-center gap-2">
              <Home className="h-4 w-4" /> Home
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-8 mt-8">
            {steps.map((step, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center font-bold">
                  {index + 1}
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HowItWorks;
