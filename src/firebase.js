import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBldnEeJj9OzBe49_YusBSS5SOm8tnqCh0",
  authDomain: "linktree-2bf1e.firebaseapp.com",
  projectId: "linktree-2bf1e",
  storageBucket: "linktree-2bf1e.appspot.com",
  messagingSenderId: "809827089387",
  appId: "1:809827089387:web:f7a49772599e134afd77ae",
  measurementId: "G-MF0Y5ZNPP0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getDatabase(app);