import { initializeApp } from "firebase/app";
import { getAuth, setPersistence, browserLocalPersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDtSIWeOQ_fu_NsyXEdjKSj5VSPukxdaww",
  authDomain: "fishero-91035.firebaseapp.com",
  projectId: "fishero-91035",
  storageBucket: "fishero-91035.appspot.com",
  messagingSenderId: "586223285003",
  appId: "1:586223285003:web:932a27f1e57419f32aa80e",
  measurementId: "G-YPEVVYQGCC"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
setPersistence(auth, browserLocalPersistence);

export const db = getFirestore(app);
export const analytics = getAnalytics(app);
