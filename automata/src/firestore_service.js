import { db } from "./firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { alert } from "./alert";

const studentCollectionRef = collection(db, "students");

const firestoreService = {
  saveStudent: (student) => {
    addDoc(studentCollectionRef, student)
      .then((response) => console.log(response))
      .catch((badRequest) => console.log(badRequest));
  },
  getStudents: () => {
    return getDocs(studentCollectionRef);
  },
};
export { firestoreService };
