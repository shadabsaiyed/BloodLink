import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Home, MapPin, Phone, Clock } from "lucide-react";

const centers = [
  {
    name: "Civil Hospital Blood Bank",
    address: "Near KH-5, Sector-15, Gandhinagar, Gujarat, 382015",
    phone: "+91 79 2324 1911",
    hours: "Mon–Sat: 8:00 AM – 6:00 PM",
    mapUrl: "https://www.google.com/maps?q=Civil+Hospital+Gandhinagar+Gujarat",
  },
  {
    name: "Sola Civil Hospital",
    address: "Sola, Ahmedabad, Gujarat, 380060",
    phone: "+91 79 2771 2345",
    hours: "Mon–Sat: 9:00 AM – 5:00 PM",
    mapUrl: "https://www.google.com/maps?q=Sola+Civil+Hospital+Ahmedabad",
  },
  {
    name: "Red Cross Blood Bank",
    address: "Usmanpura, Ahmedabad, Gujarat, 380013",
    phone: "+91 79 2755 0022",
    hours: "Mon–Sun: 8:00 AM – 8:00 PM",
    mapUrl: "https://www.google.com/maps?q=Red+Cross+Blood+Bank+Ahmedabad",
  },
];

const DonationCentersPage = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Donation Centers</h1>
            <p className="text-gray-500 mt-1">Find a blood donation center near you</p>
          </div>
          <Button variant="outline" onClick={() => navigate("/")} className="flex items-center gap-2">
            <Home className="h-4 w-4" /> Home
          </Button>
        </div>

        {/* Embedded Google Map */}
        <Card className="mb-8 overflow-hidden">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-red-600" />
              Map View — Gandhinagar & Nearby
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <iframe
              title="Blood Donation Centers Near Gandhinagar"
              src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d58786.45!2d72.6369!3d23.2156!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sblood+donation+center+gandhinagar+gujarat!5e0!3m2!1sen!2sin!4v1"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </CardContent>
        </Card>

        {/* Center Cards */}
        <div className="grid gap-6">
          {centers.map((center, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold text-gray-900">{center.name}</h3>
                    <p className="flex items-center gap-2 text-gray-600">
                      <MapPin className="h-4 w-4 text-red-600 shrink-0" />
                      {center.address}
                    </p>
                    <p className="flex items-center gap-2 text-gray-600">
                      <Phone className="h-4 w-4 text-red-600 shrink-0" />
                      {center.phone}
                    </p>
                    <p className="flex items-center gap-2 text-gray-600">
                      <Clock className="h-4 w-4 text-red-600 shrink-0" />
                      {center.hours}
                    </p>
                  </div>
                  <Button
                    className="bg-red-600 hover:bg-red-700 shrink-0"
                    onClick={() => window.open(center.mapUrl, "_blank")}
                  >
                    Open in Maps
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DonationCentersPage;
