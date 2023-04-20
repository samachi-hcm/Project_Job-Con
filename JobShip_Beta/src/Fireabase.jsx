// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA3JTiS5EnFusUxnSSEUu-37lbMjNgd4g4",
  authDomain: "jobrecord-8c52b.firebaseapp.com",
  projectId: "jobrecord-8c52b",
  storageBucket: "jobrecord-8c52b.appspot.com",
  messagingSenderId: "132522316388",
  appId: "1:132522316388:web:b9bba8bdd4a53c949a8571",
  measurementId: "G-ZF2MZDSKFN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);