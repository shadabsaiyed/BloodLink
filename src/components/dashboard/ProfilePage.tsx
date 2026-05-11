import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, LayoutDashboard } from "lucide-react";
import UserProfile from "./UserProfile";

const ProfilePage = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">My Profile</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => navigate("/dashboard")} className="flex items-center gap-2">
            <LayoutDashboard className="h-4 w-4" /> Dashboard
          </Button>
          <Button variant="outline" onClick={() => navigate("/")} className="flex items-center gap-2">
            <Home className="h-4 w-4" /> Home
          </Button>
        </div>
      </div>
      <UserProfile />
    </div>
  );
};

export default ProfilePage;
