import { auth, db } from "./firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  UserCredential,
} from "firebase/auth";
import { doc, setDoc, collection } from "firebase/firestore";

export const signUp = async (
  email: string,
  password: string,
  type: "donor" | "organization",
): Promise<UserCredential> => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password,
  );
  const { user } = userCredential;

  // Store user type in users collection
  await setDoc(doc(db, "users", user.uid), {
    email,
    type,
    createdAt: new Date(),
  });

  // If organization, create their document in organizations collection
  if (type === "organization") {
    await setDoc(doc(db, "organizations", user.uid), {
      email,
      createdAt: new Date(),
    });
  }

  return userCredential;
};

export const signIn = async (
  email: string,
  password: string,
): Promise<UserCredential> => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const signOut = async (): Promise<void> => {
  return firebaseSignOut(auth);
};
