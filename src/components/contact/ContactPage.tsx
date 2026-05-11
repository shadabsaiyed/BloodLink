import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { Home } from "lucide-react";

const ContactPage = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto py-20 px-4">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-3xl font-bold flex-1 text-center">Contact Us</CardTitle>
            <Button variant="outline" onClick={() => navigate("/")} className="flex items-center gap-2">
              <Home className="h-4 w-4" /> Home
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Your name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="Your email" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input id="subject" placeholder="Message subject" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" placeholder="Your message" className="min-h-[150px]" />
            </div>
            <Button className="w-full bg-red-600 hover:bg-red-700">Send Message</Button>
          </form>

          <div className="mt-8 pt-8 border-t">
            <h3 className="text-xl font-semibold mb-4">Other Ways to Reach Us</h3>
            <div className="space-y-4 text-gray-600">
              <p><strong>Email:</strong> support@bloodlink.com</p>
              <p><strong>Phone:</strong> +91 79 2324 1911</p>
              <p><strong>Address:</strong> Near KH-5, Sector-15, Gandhinagar, Gujarat, 382015, India</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContactPage;
