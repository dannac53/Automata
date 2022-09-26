import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyB76-U2ewy5SO8rvC-iaVSOYkg9u1nx3gY",
  authDomain: "automatas-789e7.firebaseapp.com",
  projectId: "automatas-789e7",
  storageBucket: "automatas-789e7.appspot.com",
  messagingSenderId: "543979723628",
  appId: "1:543979723628:web:6f5c0014a07f7baf7af149",
};
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
export { firestore };
