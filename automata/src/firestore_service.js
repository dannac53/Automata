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
    addDoc(studentCollectionRef, student)
      .then((response) => console.log(response))
      .catch((badRequest) => console.log(badRequest));
  },
  getStudents: () => getDocs(studentCollectionRef),
  deleteById: (studentId) => {
    const docRef = doc(db, "students", studentId);
    return deleteDoc(docRef);
  },
};
export { firestoreService };
