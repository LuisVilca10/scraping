import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCY8tgch1HD6J-3wFdv85mbGwai8gyhrk0",
    authDomain: "proyectosfirebase-1f02c.firebaseapp.com",
    projectId: "proyectosfirebase-1f02c",
    storageBucket: "proyectosfirebase-1f02c.firebasestorage.app",
    messagingSenderId: "13384973927",
    appId: "1:13384973927:web:8fb1186a57fbdc9a63dec2"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
const auth = getAuth(app);

export { auth };