import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDNzvUlX4IMYiZvzT-tbfmwohfxhdo6xg8",
  authDomain: "charity-management-54827.firebaseapp.com",
  projectId: "charity-management-54827",
  storageBucket: "charity-management-54827.appspot.com",
  messagingSenderId: "869861277922",
  appId: "1:869861277922:web:63288a35c352e4d40a1ebb"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore();