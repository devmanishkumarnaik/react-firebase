import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCfR01kEleTxXIMlzoYRK8Aeb4Nt6eKztI",
  authDomain: "react-firebase-5c0fd.firebaseapp.com",
  projectId: "react-firebase-5c0fd",
  storageBucket: "react-firebase-5c0fd.firebasestorage.app",
  messagingSenderId: "698491760709",
  appId: "1:698491760709:web:4b07b88d973b084336332c",
  measurementId: "G-R56RZ4J477",
  databaseURL: "https://react-firebase-5c0fd-default-rtdb.firebaseio.com"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);