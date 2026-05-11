import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { getProfile, saveProfile, type UserProfile as ProfileType } from "@/lib/profile";
import { Droplet, Phone, MapPin, User, Calendar, Heart, AlertCircle, Users } from "lucide-react";

const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const bloodTypeColors: Record<string, string> = {
  "A+": "bg-red-100 text-red-700",
  "A-": "bg-red-100 text-red-800",
  "B+": "bg-blue-100 text-blue-700",
  "B-": "bg-blue-100 text-blue-800",
  "AB+": "bg-purple-100 text-purple-700",
  "AB-": "bg-purple-100 text-purple-800",
  "O+": "bg-green-100 text-green-700",
  "O-": "bg-green-100 text-green-800",
};

const UserProfile = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState<Partial<ProfileType>>({
    firstName: "",
    lastName: "",
    email: user?.email || "",
    phone: "",
    bloodType: "",
    dateOfBirth: "",
    address: "",
    totalDonations: 0,
    lastDonationDate: "",
    medicalConditions: "",
    emergencyContact: "",
  });

  useEffect(() => {
    const loadProfile = async () => {
      if (!user) return;
      try {
        const data = await getProfile(user.uid);
        if (data) setProfile({ ...data, email: user.email || data.email });
        else setProfile(p => ({ ...p, email: user.email || "" }));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadProfile();
  }, [user]);

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);
    try {
      await saveProfile(user.uid, profile);
      toast({ title: "✅ Profile saved!", description: "Your information has been updated." });
      setEditing(false);
    } catch (err: any) {
      toast({ title: "Error", description: err.message, variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  const fullName = `${profile.firstName || ""} ${profile.lastName || ""}`.trim() || "Your Name";
  const initials = `${profile.firstName?.[0] || ""}${profile.lastName?.[0] || ""}`.toUpperCase() || "?";

  if (loading) return (
    <div className="flex items-center justify-center py-20">
      <div className="animate-pulse text-gray-400">Loading profile...</div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Profile Card Header */}
      <Card className="overflow-hidden">
        <div className="h-24 bg-gradient-to-r from-red-500 to-red-700" />
        <CardContent className="pt-0 pb-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 -mt-10">
            <div className="flex items-end gap-4">
              {/* Avatar */}
              <div className="w-20 h-20 rounded-full bg-white border-4 border-white shadow-md flex items-center justify-center text-2xl font-bold text-red-600">
                {initials}
              </div>
              <div className="mb-2">
                <h2 className="text-2xl font-bold text-gray-900">{fullName}</h2>
                <p className="text-gray-500 text-sm">{profile.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 mb-2">
              {profile.bloodType && (
                <span className={`px-3 py-1 rounded-full text-sm font-bold ${bloodTypeColors[profile.bloodType] || "bg-gray-100 text-gray-700"}`}>
                  🩸 {profile.bloodType}
                </span>
              )}
              <Button
                onClick={() => editing ? handleSave() : setEditing(true)}
                className="bg-red-600 hover:bg-red-700"
                disabled={saving}
              >
                {saving ? "Saving..." : editing ? "Save Profile" : "Edit Profile"}
              </Button>
              {editing && (
                <Button variant="outline" onClick={() => setEditing(false)}>Cancel</Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { icon: <Heart className="h-5 w-5 text-red-600" />, label: "Total Donations", value: profile.totalDonations ?? 0 },
          { icon: <Droplet className="h-5 w-5 text-red-600" />, label: "Blood Type", value: profile.bloodType || "—" },
          { icon: <Calendar className="h-5 w-5 text-red-600" />, label: "Last Donation", value: profile.lastDonationDate || "—" },
          { icon: <Users className="h-5 w-5 text-red-600" />, label: "Lives Impacted", value: ((profile.totalDonations ?? 0) * 3).toString() },
        ].map((stat, i) => (
          <Card key={i} className="text-center p-4">
            <div className="flex justify-center mb-2">{stat.icon}</div>
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
          </Card>
        ))}
      </div>

      {/* Profile Details */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5 text-red-600" /> Personal Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>First Name</Label>
              {editing ? (
                <Input value={profile.firstName || ""} onChange={e => setProfile(p => ({ ...p, firstName: e.target.value }))} placeholder="First name" />
              ) : (
                <p className="text-gray-700 py-2">{profile.firstName || <span className="text-gray-400 italic">Not set</span>}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label>Last Name</Label>
              {editing ? (
                <Input value={profile.lastName || ""} onChange={e => setProfile(p => ({ ...p, lastName: e.target.value }))} placeholder="Last name" />
              ) : (
                <p className="text-gray-700 py-2">{profile.lastName || <span className="text-gray-400 italic">Not set</span>}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <p className="text-gray-700 py-2">{profile.email}</p>
            </div>
            <div className="space-y-2">
              <Label>Phone Number</Label>
              {editing ? (
                <Input value={profile.phone || ""} onChange={e => setProfile(p => ({ ...p, phone: e.target.value }))} placeholder="+91 XXXXX XXXXX" />
              ) : (
                <p className="text-gray-700 py-2">{profile.phone || <span className="text-gray-400 italic">Not set</span>}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label>Date of Birth</Label>
              {editing ? (
                <Input type="date" value={profile.dateOfBirth || ""} onChange={e => setProfile(p => ({ ...p, dateOfBirth: e.target.value }))} />
              ) : (
                <p className="text-gray-700 py-2">{profile.dateOfBirth || <span className="text-gray-400 italic">Not set</span>}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label>Blood Type</Label>
              {editing ? (
                <Select value={profile.bloodType || ""} onValueChange={v => setProfile(p => ({ ...p, bloodType: v }))}>
                  <SelectTrigger><SelectValue placeholder="Select blood type" /></SelectTrigger>
                  <SelectContent>
                    {bloodTypes.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                  </SelectContent>
                </Select>
              ) : (
                <p className="py-2">
                  {profile.bloodType
                    ? <span className={`px-2 py-1 rounded text-sm font-semibold ${bloodTypeColors[profile.bloodType] || ""}`}>{profile.bloodType}</span>
                    : <span className="text-gray-400 italic">Not set</span>}
                </p>
              )}
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label>Address</Label>
              {editing ? (
                <Input value={profile.address || ""} onChange={e => setProfile(p => ({ ...p, address: e.target.value }))} placeholder="Your address" />
              ) : (
                <p className="text-gray-700 py-2">{profile.address || <span className="text-gray-400 italic">Not set</span>}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Medical Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-red-600" /> Medical Information
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label>Total Donations</Label>
            {editing ? (
              <Input type="number" min="0" value={profile.totalDonations ?? 0} onChange={e => setProfile(p => ({ ...p, totalDonations: parseInt(e.target.value) || 0 }))} />
            ) : (
              <p className="text-gray-700 py-2">{profile.totalDonations ?? 0}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label>Last Donation Date</Label>
            {editing ? (
              <Input type="date" value={profile.lastDonationDate || ""} onChange={e => setProfile(p => ({ ...p, lastDonationDate: e.target.value }))} />
            ) : (
              <p className="text-gray-700 py-2">{profile.lastDonationDate || <span className="text-gray-400 italic">Not set</span>}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label>Medical Conditions (if any)</Label>
            {editing ? (
              <Input value={profile.medicalConditions || ""} onChange={e => setProfile(p => ({ ...p, medicalConditions: e.target.value }))} placeholder="e.g. None, Diabetes, etc." />
            ) : (
              <p className="text-gray-700 py-2">{profile.medicalConditions || <span className="text-gray-400 italic">None</span>}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label>Emergency Contact</Label>
            {editing ? (
              <Input value={profile.emergencyContact || ""} onChange={e => setProfile(p => ({ ...p, emergencyContact: e.target.value }))} placeholder="Name & phone number" />
            ) : (
              <p className="text-gray-700 py-2">{profile.emergencyContact || <span className="text-gray-400 italic">Not set</span>}</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserProfile;
