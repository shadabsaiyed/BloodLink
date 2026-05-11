import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { UserRound, Building2, Mail, Lock } from "lucide-react";
import { signIn, signUp } from "@/lib/auth";
import { useToast } from "@/components/ui/use-toast";
import React, { useState } from "react";

interface AuthModalProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const AuthModal = ({ isOpen = true, onClose = () => {} }: AuthModalProps) => {
  const [activeTab, setActiveTab] = useState("donor");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleAuth = async (isSignUp: boolean) => {
    const type = activeTab === "donor" ? "donor" : "organization";
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);
      if (isSignUp) {
        await signUp(email, password, type);
        toast({
          title: "Account created successfully",
          description: "You can now sign in with your credentials",
        });
      } else {
        await signIn(email, password);
        toast({
          title: "Signed in successfully",
          description: "Welcome back!",
        });
        onClose();
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[480px] bg-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center text-gray-900">
            Welcome to Blood Donation Platform
          </DialogTitle>
        </DialogHeader>

        <Tabs
          defaultValue={activeTab}
          className="w-full"
          onValueChange={setActiveTab}
        >
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="donor" className="flex items-center gap-2">
              <UserRound className="w-4 h-4" />
              Donor
            </TabsTrigger>
            <TabsTrigger value="provider" className="flex items-center gap-2">
              <Building2 className="w-4 h-4" />
              Healthcare Provider
            </TabsTrigger>
          </TabsList>

          <TabsContent value="donor">
            <Card>
              <CardHeader>
                <CardTitle>Donor Login</CardTitle>
                <CardDescription>
                  Sign in to manage your donations and appointments
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="donor-email">Email</Label>
                  <Input
                    id="donor-email"
                    type="email"
                    placeholder="Enter your email"
                    className="w-full"
                    icon={<Mail className="w-4 h-4" />}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="donor-password">Password</Label>
                  <Input
                    id="donor-password"
                    type="password"
                    placeholder="Enter your password"
                    className="w-full"
                    icon={<Lock className="w-4 h-4" />}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-4">
                <Button
                  className="w-full bg-red-600 hover:bg-red-700"
                  onClick={() => handleAuth(false)}
                  disabled={loading}
                >
                  {loading ? "Signing in..." : "Sign In"}
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => handleAuth(true)}
                  disabled={loading}
                >
                  {loading ? "Creating account..." : "Create Account"}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="provider">
            <Card>
              <CardHeader>
                <CardTitle>Healthcare Provider Login</CardTitle>
                <CardDescription>
                  Access your organization's donation management system
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="provider-email">Email</Label>
                  <Input
                    id="provider-email"
                    type="email"
                    placeholder="Enter your email"
                    className="w-full"
                    icon={<Mail className="w-4 h-4" />}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="provider-password">Password</Label>
                  <Input
                    id="provider-password"
                    type="password"
                    placeholder="Enter your password"
                    className="w-full"
                    icon={<Lock className="w-4 h-4" />}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-4">
                <Button
                  className="w-full bg-red-600 hover:bg-red-700"
                  onClick={() => handleAuth(false)}
                  disabled={loading}
                >
                  {loading ? "Signing in..." : "Sign In"}
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => handleAuth(true)}
                  disabled={loading}
                >
                  {loading ? "Creating account..." : "Register Organization"}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
