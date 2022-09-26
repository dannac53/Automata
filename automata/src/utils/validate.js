import { regExp } from "./regExp";
import { alert } from "../alert";
import { firestoreService } from "../firestore_service";

export const validate = (students) => {
  const keys = Object.keys(students[0]);
  const approve = [];
  const rejected = [];
  students.map((student) => {
    const object = keys.reduce((acc, key) => {
      acc[key] = isMatch(student[key], regExp[key]);
      return acc;
    }, {});
    const isApprove = Object.values(object).filter((value) => !value);
    if (isApprove.length === 0) approve.push(student);
    else rejected.push(student);
  });
  showStudentsNoValid(rejected);
  saveStudents(approve);
};

const isMatch = (value, regExp) => regExp.test(value);

const saveStudents = (students) => {
  students.map((student) => firestoreService.saveStudent(student));
};

const showStudentsNoValid = (students) => {
  let tr = "";
  students.map((student) => {
    tr += `<tr>
      <td>${student.name}</td>
      <td>${student.code}</td>
      <td>${student.date}</td>
      <td>${student.email}</td>
    </tr>`;
  });
  alert.infoWithHtml(tr);
};
