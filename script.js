const firebase = require('firebase');
// Required for side-effects
require('firebase/firestore');

// Initialize Cloud Firestore through Firebase
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
const firebaseApp = initializeApp({
  apiKey: 'AIzaSyAMG8PFPmIH-gl-qKT8muYcnU0vpx8QgE0',
  authDomain: 'fir-d2693.firebaseapp.com',
  projectId: 'fir-d2693',
});

const db = getFirestore();

import { collection, getDocs } from 'firebase/firestore';

const querySnapshot = await getDocs(collection(db, 'users'));
querySnapshot.forEach((doc) => {
  console.log(`${doc.id} => ${doc.data()}`);
});
