// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
console.log(import.meta.env.VITE_FIREBASE_API);

let firebase_api_key;

if (import.meta.env.MODE === "development") {
  firebase_api_key = "AIzaSyC3J5Geb4SOlUczXxkY58URhUrvvIat9XU";
} else {
  firebase_api_key = import.meta.env.VITE_FIREBASE_API;
}

const firebaseConfig = {
  // apiKey: "AIzaSyC3J5Geb4SOlUczXxkY58URhUrvvIat9XU",

  // apiKey: import.meta.env.VITE_FIREBASE_API,
  apiKey: firebase_api_key,
  authDomain: "zorofit-5beb9.firebaseapp.com",
  projectId: "zorofit-5beb9",
  storageBucket: "zorofit-5beb9.appspot.com",
  messagingSenderId: "782570383867",
  appId: "1:782570383867:web:bdb744d9542e63d3e1435e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    if (!result.ok) {
      throw new Error("Something wrong with google signup");
    }

    const name = result.user.displayName;
    const email = result.user.email;
    const profilePic = result.user.photoURL;

    localStorage.setItem("googleSignupName", name);
    localStorage.setItem("googleSignupEmail", email);
    // localStorage.setItem("profile", profilePic);
    console.log(result);
  } catch (error) {
    console.log(error);
  }
};

export const db = getFirestore(app);
