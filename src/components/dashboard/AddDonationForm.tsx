import React, { useState } from "react";
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
import { useToast } from "@/components/ui/use-toast";
import { addDonation } from "@/lib/donations";
import { getProfile, saveProfile } from "@/lib/profile";
import { auth } from "@/lib/firebase";

interface AddDonationFormProps {
  onSuccess?: () => void;
}

const AddDonationForm = ({ onSuccess }: AddDonationFormProps) => {
  const [bloodType, setBloodType] = useState("");
  const [donationDate, setDonationDate] = useState("");
  const [center, setCenter] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bloodType || !donationDate || !center || !amount) {
      toast({ title: "Error", description: "Please fill in all fields", variant: "destructive" });
      return;
    }

    setLoading(true);
    try {
      // 1. Save the donation
      await addDonation({ bloodType, donationDate, center, amount: Number(amount) });

      // 2. Auto-update profile stats
      const user = auth.currentUser;
      if (user) {
        const profile = await getProfile(user.uid);
        const currentTotal = profile?.totalDonations ?? 0;

        // Only update lastDonationDate if this donation is more recent
        const existingLastDate = profile?.lastDonationDate || "";
        const newLastDate = donationDate > existingLastDate ? donationDate : existingLastDate;

        await saveProfile(user.uid, {
          totalDonations: currentTotal + 1,
          lastDonationDate: newLastDate,
          // Also update blood type in profile if not set
          ...(profile?.bloodType ? {} : { bloodType }),
        });
      }

      toast({ title: "✅ Donation added!", description: "Your profile stats have been updated automatically." });

      setBloodType(""); setDonationDate(""); setCenter(""); setAmount("");
      onSuccess?.();
    } catch (error: any) {
      toast({ title: "Error", description: error.message || "Failed to save donation details", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Add Donation Details</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
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
            <Label>Donation Date</Label>
            <Input type="date" value={donationDate} onChange={(e) => setDonationDate(e.target.value)} />
          </div>

          <div className="space-y-2">
            <Label>Donation Center</Label>
            <Input placeholder="Enter donation center name" value={center} onChange={(e) => setCenter(e.target.value)} />
          </div>

          <div className="space-y-2">
            <Label>Amount (ml)</Label>
            <Input type="number" placeholder="Enter amount in ml" value={amount} onChange={(e) => setAmount(e.target.value)} />
          </div>

          <Button type="submit" className="w-full bg-red-600 hover:bg-red-700" disabled={loading}>
            {loading ? "Submitting..." : "Submit Donation"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddDonationForm;
