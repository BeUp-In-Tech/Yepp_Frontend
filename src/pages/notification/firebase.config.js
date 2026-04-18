import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyA6_inEReD0lKuzY2pSld4-sfPHK136tOs",
  authDomain: "yepp-app.firebaseapp.com",
  projectId: "yepp-app",
  storageBucket: "yepp-app.firebasestorage.app",
  messagingSenderId: "191216477482",
  appId: "1:191216477482:web:20c68fdc7fc557d4c2ea53"
};

export const app = initializeApp(firebaseConfig);