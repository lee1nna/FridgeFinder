// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCSaBRDYcmjfSRzAvEFmQZ1W9wvE41O9xw",
  authDomain: "fridgefinder-ec1da.firebaseapp.com",
  projectId: "fridgefinder-ec1da",
  storageBucket: "fridgefinder-ec1da.appspot.com",
  messagingSenderId: "371392341208",
  appId: "1:371392341208:web:c977f0717869d518ade3ad",
  measurementId: "G-95ZZQKPGX2",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
