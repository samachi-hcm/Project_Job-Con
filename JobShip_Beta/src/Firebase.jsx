import firebase from "firebase/compat/app"
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { FacebookAuthProvider, GoogleAuthProvider, TwitterAuthProvider, getAuth,signInWithPopup,signOut } from "firebase/auth"

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
const auth = getAuth(app)
const googleProvider = new GoogleAuthProvider()
const facebookProvider = new FacebookAuthProvider()
const twitterProvider = new TwitterAuthProvider()

const signInwithGoogle = () => {
  signInWithPopup(auth, googleProvider)
}

const googleButton = (
  <button onClick={signInwithGoogle}>Google</button>
)


//firestore
const db = getFirestore(app)

export { 
  auth,
  googleProvider,
  facebookProvider,
  twitterProvider,
  db,
  signOut,
  googleButton
}