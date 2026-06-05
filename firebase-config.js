import { initializeApp } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-firestore.js";

// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyAr9YvgbW9_AWNv1kX-tMj4SJSE3mnp1UM",
    authDomain: "jupeb-9d843.firebaseapp.com",
    projectId: "jupeb-9d843",
    storageBucket: "jupeb-9d843.firebasestorage.app",
    messagingSenderId: "1005568564858",
    appId: "1:1005568564858:web:69213e9e9d01b9aa67a5c3",
    measurementId: "G-V94BFM2TBQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
