import React from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const ScheduleDonation = () => {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Schedule Donation</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label>Select Donation Center</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Choose a donation center" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="center1">City Hospital Blood Bank</SelectItem>
              <SelectItem value="center2">Red Cross Donation Center</SelectItem>
              <SelectItem value="center3">Community Health Center</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Select Date</Label>
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border"
          />
        </div>

        <div className="space-y-2">
          <Label>Select Time Slot</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Choose a time slot" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="9:00">9:00 AM</SelectItem>
              <SelectItem value="10:00">10:00 AM</SelectItem>
              <SelectItem value="11:00">11:00 AM</SelectItem>
              <SelectItem value="12:00">12:00 PM</SelectItem>
              <SelectItem value="14:00">2:00 PM</SelectItem>
              <SelectItem value="15:00">3:00 PM</SelectItem>
              <SelectItem value="16:00">4:00 PM</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button className="w-full bg-red-600 hover:bg-red-700">
          Schedule Appointment
        </Button>
      </CardContent>
    </Card>
  );
};

export default ScheduleDonation;
