import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Home } from "lucide-react";

const DonatePage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className="container mx-auto py-20 px-4">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-3xl font-bold text-center flex-1">
              Donate Blood
            </CardTitle>
            <Button variant="outline" onClick={() => navigate("/")} className="flex items-center gap-2">
              <Home className="h-4 w-4" /> Home
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <p className="text-lg text-gray-600">
              Your blood donation can save up to three lives! Choose how you'd like to donate:
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-4">Schedule a Donation</h3>
                <p className="text-gray-600 mb-4">
                  Book an appointment at your preferred donation center.
                </p>
                <Button
                  className="w-full bg-red-600 hover:bg-red-700"
                  onClick={() => user ? navigate("/dashboard") : navigate("/")}
                >
                  {user ? "Schedule Now" : "Sign In to Schedule"}
                </Button>
              </Card>
              <Card className="p-6">
                <h3 className="text-xl font-semibold mb-4">Find Donation Centers</h3>
                <p className="text-gray-600 mb-4">
                  Locate blood donation centers near you.
                </p>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => navigate("/donation-centers")}
                >
                  Find Centers
                </Button>
              </Card>
            </div>
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4">Donation Requirements</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li>Be at least 18 years old</li>
                <li>Weigh at least 110 pounds</li>
                <li>Be in good general health</li>
                <li>Have not donated blood in the last 56 days</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DonatePage;
