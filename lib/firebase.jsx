import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyBJtvDqDKp09CjAwlZIww1k9IN2fycZdl8",
  authDomain: "blog-website-a6fb0.firebaseapp.com",
  projectId: "blog-website-a6fb0",
  storageBucket: "blog-website-a6fb0.firebasestorage.app",
  messagingSenderId: "423435136357",
  appId: "1:423435136357:web:d057ed8a30d33bdbb8c58c",
  // measurementId: "G-FJSJD38NPC"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);

export const db = getFirestore();
export const auth = getAuth();
export const storage = getStorage();