import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyARAZdlU58MOqnegJ-ADlvZSjMCXG6czls",
  authDomain: "dav-shop-online-store.firebaseapp.com",
  projectId: "dav-shop-online-store",
  storageBucket: "dav-shop-online-store.appspot.com",
  messagingSenderId: "288769602194",
  appId: "1:288769602194:web:27e3e3894b93c8461aac4b",
  measurementId: "G-98F9BD2H54",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
// const analytics = getAnalytics(app);

export { app, auth };
