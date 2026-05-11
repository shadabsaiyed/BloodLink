import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { Home } from "lucide-react";
import { addDonor, getOrganizationDonors, type Donor } from "@/lib/donors";

const OrganizationDashboard = () => {
  const [donors, setDonors] = useState<Donor[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [bloodType, setBloodType] = useState("");
  const [contact, setContact] = useState("");
  const [lastDonation, setLastDonation] = useState("");

  useEffect(() => {
    loadDonors();
  }, []);

  const loadDonors = async () => {
    try {
      const fetchedDonors = await getOrganizationDonors();
      setDonors(fetchedDonors);
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !bloodType || !contact) {
      toast({ title: "Error", description: "Please fill in all required fields", variant: "destructive" });
      return;
    }
    try {
      await addDonor({ name, bloodType, contact, lastDonation });
      toast({ title: "Success", description: "Donor added successfully" });
      setName(""); setBloodType(""); setContact(""); setLastDonation("");
      setShowAddForm(false);
      loadDonors();
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Organization Dashboard</h1>
        <div className="flex gap-2">
          <Button
            onClick={() => setShowAddForm(!showAddForm)}
            className="bg-red-600 hover:bg-red-700"
          >
            {showAddForm ? "Cancel" : "Add Donor"}
          </Button>
          <Button
            variant="outline"
            onClick={() => navigate("/")}
            className="flex items-center gap-2"
          >
            <Home className="h-4 w-4" />
            Home
          </Button>
        </div>
      </div>

      {showAddForm && (
        <Card className="mb-8">
          <CardHeader><CardTitle>Add New Donor</CardTitle></CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Name</Label>
                  <Input placeholder="Donor's name" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>Blood Type</Label>
                  <Select value={bloodType} onValueChange={setBloodType}>
                    <SelectTrigger><SelectValue placeholder="Select blood type" /></SelectTrigger>
                    <SelectContent>
                      {["A+","A-","B+","B-","AB+","AB-","O+","O-"].map(t => (
                        <SelectItem key={t} value={t}>{t}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Contact</Label>
                  <Input placeholder="Phone number" value={contact} onChange={(e) => setContact(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>Last Donation Date</Label>
                  <Input type="date" value={lastDonation} onChange={(e) => setLastDonation(e.target.value)} />
                </div>
              </div>
              <Button type="submit" className="w-full bg-red-600 hover:bg-red-700">Add Donor</Button>
            </form>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader><CardTitle>Registered Donors</CardTitle></CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Blood Type</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Last Donation</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow><TableCell colSpan={4} className="text-center">Loading...</TableCell></TableRow>
              ) : donors.length === 0 ? (
                <TableRow><TableCell colSpan={4} className="text-center">No donors registered yet.</TableCell></TableRow>
              ) : (
                donors.map((donor) => (
                  <TableRow key={donor.id}>
                    <TableCell>{donor.name}</TableCell>
                    <TableCell>{donor.bloodType}</TableCell>
                    <TableCell>{donor.contact}</TableCell>
                    <TableCell>{donor.lastDonation || "N/A"}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrganizationDashboard;
