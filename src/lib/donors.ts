import {
  collection,
  addDoc,
  query,
  getDocs,
  orderBy,
  serverTimestamp,
  doc,
  getDoc,
} from "firebase/firestore";
import { auth, db } from "./firebase";

export interface Donor {
  id?: string;
  name: string;
  bloodType: string;
  contact: string;
  lastDonation?: string;
  organizationId: string;
  createdAt: Date;
}

export const addDonor = async (
  donor: Omit<Donor, "organizationId" | "createdAt">,
) => {
  const user = auth.currentUser;
  if (!user) throw new Error("Organization must be logged in");

  // Verify user is an organization
  const userDoc = await getDoc(doc(db, "users", user.uid));
  if (!userDoc.exists() || userDoc.data().type !== "organization") {
    throw new Error("Only organizations can add donors");
  }

  const donorData = {
    ...donor,
    organizationId: user.uid,
    createdAt: serverTimestamp(),
  };

  try {
    // Add donor to organization's donors subcollection
    const docRef = await addDoc(
      collection(db, "organizations", user.uid, "donors"),
      donorData,
    );
    return { id: docRef.id, ...donorData, createdAt: new Date() };
  } catch (error) {
    console.error("Error adding donor:", error);
    throw new Error("Failed to add donor. Please try again.");
  }
};

export const getOrganizationDonors = async () => {
  const user = auth.currentUser;
  if (!user) throw new Error("Organization must be logged in");

  // Verify user is an organization
  const userDoc = await getDoc(doc(db, "users", user.uid));
  if (!userDoc.exists() || userDoc.data().type !== "organization") {
    throw new Error("Only organizations can view donors");
  }

  try {
    const donorsRef = collection(db, "organizations", user.uid, "donors");
    const q = query(donorsRef, orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate() || new Date(),
    }));
  } catch (error) {
    console.error("Error fetching donors:", error);
    throw new Error("Failed to load donors. Please try again.");
  }
};
