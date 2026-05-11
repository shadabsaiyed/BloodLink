import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Home } from "lucide-react";

const Mission = () => {
  const navigate = useNavigate();
  return (
    <div className="container mx-auto py-20 px-4">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-3xl font-bold text-center flex-1">Our Mission</CardTitle>
            <Button variant="outline" onClick={() => navigate("/")} className="flex items-center gap-2">
              <Home className="h-4 w-4" /> Home
            </Button>
          </div>
        </CardHeader>
        <CardContent className="prose max-w-none">
          <p className="text-lg text-gray-600 mb-6">
            At BloodLink, our mission is to bridge the gap between blood donors and those in need,
            creating a seamless and efficient platform for blood donation management.
          </p>
          <h3 className="text-xl font-semibold mb-4">Our Core Values</h3>
          <ul className="space-y-4">
            <li className="flex items-start">
              <span className="font-semibold mr-2">Accessibility:</span>
              Making blood donation services available to everyone, everywhere.
            </li>
            <li className="flex items-start">
              <span className="font-semibold mr-2">Efficiency:</span>
              Streamlining the donation process to save more lives.
            </li>
            <li className="flex items-start">
              <span className="font-semibold mr-2">Community:</span>
              Building a network of committed donors and healthcare providers.
            </li>
            <li className="flex items-start">
              <span className="font-semibold mr-2">Innovation:</span>
              Using technology to improve blood donation services.
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default Mission;
