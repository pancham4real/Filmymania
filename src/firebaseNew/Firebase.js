import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, doc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCbTc8nI_gPqPtMxhhBSDQ3YNiA7gOYGso",
  authDomain: "filmyverse-dcdd2.firebaseapp.com",
  projectId: "filmyverse-dcdd2",
  storageBucket: "filmyverse-dcdd2.appspot.com",
  messagingSenderId: "525616740779",
  appId: "1:525616740779:web:3009c3df5974b32a563aee",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
const moviesRef = collection(db, "movies");
const reviewsRef = collection(db, "reviews");
const usersRef = collection(db, "users");

export { app, addDoc, doc, moviesRef, reviewsRef, usersRef };
