import { db } from "./firebase";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

export interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  bloodType: string;
  dateOfBirth: string;
  address: string;
  totalDonations: number;
  lastDonationDate: string;
  medicalConditions: string;
  emergencyContact: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export const getProfile = async (uid: string): Promise<UserProfile | null> => {
  const docRef = doc(db, "profiles", uid);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data() as UserProfile;
  }
  return null;
};

export const saveProfile = async (uid: string, profile: Partial<UserProfile>): Promise<void> => {
  const docRef = doc(db, "profiles", uid);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    await updateDoc(docRef, { ...profile, updatedAt: new Date() });
  } else {
    await setDoc(docRef, { ...profile, totalDonations: 0, createdAt: new Date(), updatedAt: new Date() });
  }
};
