import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBi0vdKlFCMx8R9RyDFqBxYCLL3JydGzu4",
  authDomain: "ecommerce-47246.firebaseapp.com",
  databaseURL: "https://ecommerce-47246-default-rtdb.firebaseio.com",
  projectId: "ecommerce-47246",
  storageBucket: "ecommerce-47246.appspot.com",
  messagingSenderId: "359767473633",
  appId: "1:359767473633:web:cd95f52bb6f27fde8ce6a0",
  measurementId: "G-6GV6D0MM8T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const dbs = getDatabase(app);