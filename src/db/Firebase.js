import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCuxAvTQJrZZTIJKqA6ZAF3dxEw67TwnIs",
  authDomain: "srn-digital.firebaseapp.com",
  projectId: "srn-digital",
  storageBucket: "srn-digital.appspot.com",
  messagingSenderId: "96134087877",
  appId: "1:96134087877:web:a3abf68a322c7f98d39cac",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
