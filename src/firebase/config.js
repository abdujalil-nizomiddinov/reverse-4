import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA0tC2QMjHVQoYoFaxJaUhgONFXtiZ0_Fk",
  authDomain: "abu-coder-809ba.firebaseapp.com",
  projectId: "abu-coder-809ba",
  storageBucket: "abu-coder-809ba.firebasestorage.app",
  messagingSenderId: "680314064096",
  appId: "1:680314064096:web:0a0f24b650832f91ff1485",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
