import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  orderBy,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { auth, db } from "./firebase";

export interface Donation {
  userId: string;
  bloodType: string;
  donationDate: string;
  center: string;
  amount: number;
  createdAt: Date;
}

export const addDonation = async (
  donation: Omit<Donation, "userId" | "createdAt">,
): Promise<Donation & { id: string }> => {
  const user = auth.currentUser;
  if (!user) throw new Error("User must be logged in");

  const donationWithMeta = {
    ...donation,
    userId: user.uid,
    createdAt: serverTimestamp(),
  };

  try {
    console.log("Adding donation:", donationWithMeta);
    const docRef = await addDoc(collection(db, "donations"), donationWithMeta);
    console.log("Donation added with ID:", docRef.id);
    return {
      id: docRef.id,
      ...donation,
      userId: user.uid,
      createdAt: new Date(),
    };
  } catch (error) {
    console.error("Error adding donation:", error);
    throw new Error("Failed to add donation. Please try again.");
  }
};

export const getUserDonations = async (): Promise<
  (Donation & { id: string })[]
> => {
  const user = auth.currentUser;
  if (!user) {
    console.error("No user logged in");
    throw new Error("User must be logged in");
  }

  try {
    console.log("Fetching donations for user:", user.uid);
    const donationsRef = collection(db, "donations");
    const q = query(
      donationsRef,
      where("userId", "==", user.uid),
      orderBy("createdAt", "desc"),
    );

    const querySnapshot = await getDocs(q);
    console.log("Found donations:", querySnapshot.size);

    const donations = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      console.log("Processing donation:", doc.id, data);
      const donation = {
        id: doc.id,
        userId: data.userId,
        bloodType: data.bloodType,
        donationDate: data.donationDate,
        center: data.center,
        amount: data.amount,
        createdAt:
          data.createdAt instanceof Timestamp
            ? data.createdAt.toDate()
            : new Date(data.createdAt),
      };
      return donation;
    });

    console.log("Processed donations:", donations);
    return donations;
  } catch (error) {
    console.error("Error fetching donations:", error);
    throw new Error("Failed to load donations. Please try again later.");
  }
};
