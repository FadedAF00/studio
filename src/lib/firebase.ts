// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  projectId: 'studio-5723235254-ecb78',
  appId: '1:608280925932:web:e21f19b75f2456301a77c9',
  apiKey: 'AIzaSyBixGTZAR-7sB2e1jg9Brsq1-raer32Jr8',
  authDomain: 'studio-5723235254-ecb78.firebaseapp.com',
  measurementId: '',
  messagingSenderId: '608280925932',
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
