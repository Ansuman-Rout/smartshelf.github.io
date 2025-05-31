// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"; // ✅ Added Firestore


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCXTjQQCrnp55YY0tGz5UtftiHhg_tOj4g",
  authDomain: "smartshelf-47b33.firebaseapp.com",
  projectId: "smartshelf-47b33",
  storageBucket: "smartshelf-47b33.firebasestorage.app",
  messagingSenderId: "782275613347",
  appId: "1:782275613347:web:0de260a9efc0bff6e52516",
  measurementId: "G-CL6Z88LJE6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);        // ✅ Export Firestore
const analytics = getAnalytics(app);
                          