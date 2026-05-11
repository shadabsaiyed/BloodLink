import React, { useEffect, useState } from "react";
import { getUserDonations, type Donation } from "@/lib/donations";
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

const DonationHistory = () => {
  const [donations, setDonations] = useState<(Donation & { id: string })[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        setLoading(true);
        const userDonations = await getUserDonations();
        setDonations(userDonations);
      } catch (error: any) {
        console.error("Error fetching donations:", error);
        toast({
          title: "Error",
          description: "Failed to load donations. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchDonations();
  }, [toast]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Donation History</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Blood Type</TableHead>
              <TableHead>Amount (ml)</TableHead>
              <TableHead>Donation Center</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center">
                  Loading...
                </TableCell>
              </TableRow>
            ) : donations.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center">
                  No donations found. Add your first donation to see it here!
                </TableCell>
              </TableRow>
            ) : (
              donations.map((donation) => (
                <TableRow key={donation.id}>
                  <TableCell>{donation.donationDate}</TableCell>
                  <TableCell>{donation.bloodType}</TableCell>
                  <TableCell>{donation.amount}</TableCell>
                  <TableCell>{donation.center}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default DonationHistory;
