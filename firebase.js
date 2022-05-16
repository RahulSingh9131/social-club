import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDvUutfNnkO8MBtX_9J70shn6eg7vc0tu4",
    authDomain: "social-club-c8402.firebaseapp.com",
    projectId: "social-club-c8402",
    storageBucket: "social-club-c8402.appspot.com",
    messagingSenderId: "672717899808",
    appId: "1:672717899808:web:4d7713ef0a010482f29445"
};


// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export default app;
export { db, storage };