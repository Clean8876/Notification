// firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBNTLplMaqmaA-xm-ei1Alu6LWQywe-OzM",

    authDomain: "testverify-e551e.firebaseapp.com",
  
    projectId: "testverify-e551e",
  
    storageBucket: "testverify-e551e.firebasestorage.app",
  
    messagingSenderId: "1016467102279",
  
    appId: "1:1016467102279:web:cbd40d310065bbc5a16f62",
  
    measurementId: "G-2M4E5YJ2DV"
  
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
