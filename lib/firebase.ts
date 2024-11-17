import { initializeApp, getApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCJhRBcsr-AHNYI1d0Bru6-6bB5R_mNJ6I",
    authDomain: "recycsmart.firebaseapp.com",
    projectId: "recycsmart",
    storageBucket: "recycsmart.firebasestorage.app",
    messagingSenderId: "109570827155",
    appId: "1:109570827155:web:550844ef594058a549fe66",
    measurementId: "G-B2HCQW40ZE"
  };

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };