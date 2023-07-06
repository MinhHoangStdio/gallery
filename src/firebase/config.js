import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyCGLoWVPgIkdrqwea3UBeIB-U9KxW5HEsA",
  authDomain: "images-gallery-2-a3dd1.firebaseapp.com",
  projectId: "images-gallery-2-a3dd1",
  storageBucket: "images-gallery-2-a3dd1.appspot.com",
  messagingSenderId: "1015235059387",
  appId: "1:1015235059387:web:9ddcbec10717441377139e",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage();
export const db = getFirestore();
export const auth = getAuth();
