// src/core/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase proje ayarların (seninkiyle değiştir)
const firebaseConfig = {
  apiKey: "AIzaSyDtSIWeOQ_fu_NsyXEdjKSj5VSPukxdaww",
  authDomain: "fishero-91035.firebaseapp.com",
  projectId: "fishero-91035",
  storageBucket: "fishero-91035.appspot.com",
  messagingSenderId: "586223285003",
  appId: "1:586223285003:web:932a27f1e57419f32aa80e",
  measurementId: "G-YPEVVYQGCC"
};

// Uygulamayı başlat
const app = initializeApp(firebaseConfig);

// Auth ve Firestore objelerini dışa aktar
export const auth = getAuth(app);
export const db = getFirestore(app);

