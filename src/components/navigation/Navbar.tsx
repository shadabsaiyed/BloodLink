import React from "react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Menu, Droplet, LogOut, User } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useAuth } from "@/contexts/AuthContext";
import { signOut } from "@/lib/auth";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

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
      toast({ title: "Signed out successfully" });
      navigate("/");
    } catch (error: any) {
      toast({ title: "Error signing out", description: error.message, variant: "destructive" });
    }
  };

  return (
    <nav className="w-full h-20 bg-white border-b border-gray-200 fixed top-0 z-50 px-4 md:px-6">
      <div className="max-w-7xl mx-auto h-full flex items-center justify-between">
        {/* Logo */}
        <div
          className="flex items-center space-x-2 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <Droplet className="h-8 w-8 text-red-600" />
          <span className="text-xl font-bold text-gray-900">BloodLink</span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>About</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="p-4 w-[200px] space-y-2">
                    <div onClick={() => navigate("/about/mission")} className="block p-2 hover:bg-gray-100 rounded-md cursor-pointer">Our Mission</div>
                    <div onClick={() => navigate("/about/how-it-works")} className="block p-2 hover:bg-gray-100 rounded-md cursor-pointer">How It Works</div>
                    <div onClick={() => navigate("/about/impact")} className="block p-2 hover:bg-gray-100 rounded-md cursor-pointer">Impact Stories</div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <div onClick={() => navigate("/donate")} className="p-2 cursor-pointer hover:text-red-600 transition-colors">Donate</div>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <div onClick={() => navigate("/contact")} className="p-2 cursor-pointer hover:text-red-600 transition-colors">Contact</div>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {!user ? (
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={onLogin}>Login</Button>
              <Button className="bg-red-600 hover:bg-red-700" onClick={onSignup}>Sign Up</Button>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              {/* Profile Button */}
              <Button
                variant="ghost"
                onClick={() => navigate("/profile")}
                className="flex items-center gap-2 text-gray-700 hover:text-red-600"
              >
                <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-bold text-sm">
                  <User className="h-4 w-4" />
                </div>
                Profile
              </Button>
              <Button variant="ghost" onClick={() => navigate("/dashboard")}>
                Dashboard
              </Button>
              <Button variant="ghost" onClick={handleSignOut} className="text-red-600 flex items-center gap-1">
                <LogOut className="h-4 w-4" />
                Sign Out
              </Button>
            </div>
          )}
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon"><Menu className="h-6 w-6" /></Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col space-y-4 mt-6">
                <Button variant="ghost" onClick={() => navigate("/about/mission")}>Our Mission</Button>
                <Button variant="ghost" onClick={() => navigate("/about/how-it-works")}>How It Works</Button>
                <Button variant="ghost" onClick={() => navigate("/about/impact")}>Impact Stories</Button>
                <Button variant="ghost" onClick={() => navigate("/donate")}>Donate</Button>
                <Button variant="ghost" onClick={() => navigate("/contact")}>Contact</Button>
                {!user ? (
                  <>
                    <Button variant="ghost" onClick={onLogin}>Login</Button>
                    <Button className="bg-red-600 hover:bg-red-700" onClick={onSignup}>Sign Up</Button>
                  </>
                ) : (
                  <>
                    <Button variant="ghost" onClick={() => navigate("/profile")} className="flex items-center gap-2">
                      <User className="h-4 w-4" /> Profile
                    </Button>
                    <Button variant="ghost" onClick={() => navigate("/dashboard")}>Dashboard</Button>
                    <Button variant="ghost" onClick={handleSignOut} className="text-red-600">
                      <LogOut className="h-4 w-4 mr-2" /> Sign Out
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
