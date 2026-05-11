import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Home } from "lucide-react";

const stories = [
  { name: "Sarah Johnson", story: "Thanks to blood donors, I survived a critical surgery and can now spend time with my family.", date: "March 2024" },
  { name: "Michael Chen", story: "Regular blood donations helped me through my cancer treatment. I'm now in remission and giving back as a donor.", date: "February 2024" },
  { name: "Emma Davis", story: "A car accident left me needing multiple transfusions. Blood donors saved my life.", date: "January 2024" },
];

const Impact = () => {
  const navigate = useNavigate();
  return (
    <div className="container mx-auto py-20 px-4">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-3xl font-bold text-center flex-1">Impact Stories</CardTitle>
            <Button variant="outline" onClick={() => navigate("/")} className="flex items-center gap-2">
              <Home className="h-4 w-4" /> Home
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-8 mt-8">
            {stories.map((story, index) => (
              <Card key={index} className="p-6">
                <h3 className="text-xl font-semibold mb-2">{story.name}</h3>
                <p className="text-gray-600 mb-4">"{story.story}"</p>
                <p className="text-sm text-gray-500">{story.date}</p>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Impact;
