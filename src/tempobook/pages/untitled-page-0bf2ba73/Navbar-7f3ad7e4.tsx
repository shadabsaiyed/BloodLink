import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Menu, X, Droplet, LogOut } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useAuth } from "@/contexts/AuthContext";
import { signOut } from "@/lib/auth";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import React from "react";

interface NavbarProps {
  onLogin?: () => void;
  onSignup?: () => void;
}

const Navbar = ({ onLogin = () => {}, onSignup = () => {} }: NavbarProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "Signed out successfully",
      });
      navigate("/");
    } catch (error: any) {
      toast({
        title: "Error signing out",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <nav className="w-full h-20 bg-white border-b border-gray-200 fixed top-0 z-50 px-4 md:px-6">
      <div className="max-w-7xl mx-auto h-full flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <Droplet className="h-8 w-8 text-red-600" />
          <span className="text-xl font-bold text-gray-900">BloodDonate</span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>About</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="p-4 w-[200px]">
                    <div className="space-y-2">
                      <div
                        onClick={() => navigate("/about/mission")}
                        className="block p-2 hover:bg-gray-100 rounded-md cursor-pointer"
                      >
                        Our Mission
                      </div>
                      <div
                        onClick={() => navigate("/about/how-it-works")}
                        className="block p-2 hover:bg-gray-100 rounded-md cursor-pointer"
                      >
                        How It Works
                      </div>
                      <div
                        onClick={() => navigate("/about/impact")}
                        className="block p-2 hover:bg-gray-100 rounded-md cursor-pointer"
                      >
                        Impact Stories
                      </div>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <div
                  onClick={() => navigate("/donate")}
                  className="p-2 cursor-pointer"
                >
                  Donate
                </div>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <div
                  onClick={() => navigate("/contact")}
                  className="p-2 cursor-pointer"
                >
                  Contact
                </div>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {!user ? (
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={onLogin}>
                Login
              </Button>
              <Button
                variant="default"
                className="bg-red-600 hover:bg-red-700"
                onClick={onSignup}
              >
                Sign Up
              </Button>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={() => navigate("/dashboard")}>
                Dashboard
              </Button>
              <Button
                variant="ghost"
                onClick={handleSignOut}
                className="text-red-600"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          )}
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col space-y-4 mt-6">
                <Button variant="ghost">About</Button>
                <Button variant="ghost">Donate</Button>
                <Button variant="ghost">Contact</Button>
                {!user ? (
                  <>
                    <Button variant="ghost" onClick={onLogin}>
                      Login
                    </Button>
                    <Button
                      variant="default"
                      className="bg-red-600 hover:bg-red-700"
                      onClick={onSignup}
                    >
                      Sign Up
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      variant="ghost"
                      onClick={() => navigate("/dashboard")}
                    >
                      Dashboard
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={handleSignOut}
                      className="text-red-600"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out
                    </Button>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
