import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "dav-shop-online-store.firebaseapp.com",
  projectId: "dav-shop-online-store",
  storageBucket: "dav-shop-online-store.appspot.com",
  messagingSenderId: "288769602194",
  appId: "1:288769602194:web:27e3e3894b93c8461aac4b",
  measurementId: "G-98F9BD2H54",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// GOOGLE AUTH
const provider = new GoogleAuthProvider();
const auth = getAuth();

export const authWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    const token = await user.getIdToken(); // This will retrieve the ID token
    console.log("Firebase Google Auth Token:", token);
    return { access_token: token }; // This will return an object containing the token
  } catch (error) {
    console.log(err);
    throw new Error("Authentication failed!");
  }
};
