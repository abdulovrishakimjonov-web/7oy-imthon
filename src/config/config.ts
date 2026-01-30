import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "Abdulvoris_hakimkjonov",
  authDomain: "abdulvorishakimov@gamil.com",
  projectId: "abdulvoris",
  storageBucket: "abdulvoris.api",
  messagingSenderId: "874702745",
  appId: "1:629167017049:web:8c4c2af4843b53e864f548",
  measurementId: "G-CEVQTRPFSN",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();



export const signInWithGoogle = () => {
  return signInWithPopup(auth, provider);
};



