import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";


const firebaseConfig = {
  apiKey: "AIzaSyDwbrRA4RcIa7cy6lecRikCAyOglQQ8rW8",
  authDomain: "fir-test-30de4.firebaseapp.com",
  databaseURL: "https://fir-test-30de4-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "fir-test-30de4",
  storageBucket: "fir-test-30de4.appspot.com",
  messagingSenderId: "57193832094",
  appId: "1:57193832094:web:4c1b7f805afaef3e61258f",
  measurementId: "G-8BR7KYC6K5"
};


export const app = initializeApp(firebaseConfig);