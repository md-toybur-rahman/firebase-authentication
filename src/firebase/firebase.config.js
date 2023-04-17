// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBnf52PYcXfDtUAcv9GJIh8X2RiGqfXnaw",
  authDomain: "simple-authentication-cbac0.firebaseapp.com",
  projectId: "simple-authentication-cbac0",
  storageBucket: "simple-authentication-cbac0.appspot.com",
  messagingSenderId: "833828605307",
  appId: "1:833828605307:web:45057369a157d73c7241de"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;