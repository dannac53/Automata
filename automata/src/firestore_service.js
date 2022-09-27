import { db } from "./firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";

const studentCollectionRef = collection(db, "students");

const firestoreService = {
  saveStudent: (student) => {
    return addDoc(studentCollectionRef, student);
  },
  getStudents: () => getDocs(studentCollectionRef),
  deleteById: (studentId) => {
    const docRef = doc(db, "students", studentId);
    return deleteDoc(docRef);
  },
};
export { firestoreService };
