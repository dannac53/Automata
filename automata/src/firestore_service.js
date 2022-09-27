import { db } from "./firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  getDoc,
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
  getById: (studentId) => {
    const docRef = doc(db, "students", studentId);
    return getDoc(docRef);
  },
  updateStudent: (studentId, student) => {
    const docRef = doc(db, "students", studentId);
    return updateDoc(docRef, student);
  },
};
export { firestoreService };
