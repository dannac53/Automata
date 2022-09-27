import "./Home.css";
import { convertExcelToArray } from "../utils/excel";
import { Link } from "react-router-dom";
import { validate } from "../utils/validate";
import { firestoreService } from "../firestore_service";
import { useState } from "react";
import { useEffect } from "react";
import { alert } from "../alert";

const Home = () => {
  const [copy, setCopy] = useState([]);
  const [students, setStudents] = useState([]);
  const getStudents = () => {
    firestoreService.getStudents().then((response) => {
      const data = [];
      response.docs.map((doc) => data.push({ id: doc.id, ...doc.data() }));
      setStudents(data);
      setCopy(data);
    });
  };

  const deleteById = (id) => {
    alert.confirmDelete().then((result) => {
      if (result.isConfirmed) {
        firestoreService.deleteById(id).then(() => {
          const rows = students.filter((student) => student.id !== id);
          setStudents(rows);
          alert.success("Estudiante eliminado con éxito");
        });
      }
    });
  };
  const filterStudent = (name) => {
    console.log(name);
    if (name.length === 0) setStudents(copy);
    else {
      const expresion = new RegExp(`${name}.*`, "i");
      const result = students.filter((student) => expresion.test(student.name));
      setStudents(result);
    }
  };

  const getFile = (event) => {
    const file = event.target.files[0];
    convertExcelToArray(file, (result) => {
      console.log(result);
    });
  };
  const selectFile = () => {
    document.getElementById("file").click();
  };
  useEffect(() => getStudents(), []);
  return (
    <div className="all row">
      <header className="col-12">Tabla Estudiantes</header>
      <div className="card col-12" id="tarjeta">
        <div className="seccion">
          <input
            onChange={(event) => filterStudent(event.target.value)}
            className="search col-6"
            type="text"
            placeholder="Search"
          />
          <i class="bx bx-search bx-sm" id="icon"></i>
          <Link to="/formulario" className="addstudent">
            Add student
            <i class="bx bx-user-plus bx-sm" id="icon2"></i>
          </Link>
        </div>
        <div className="btn">
          <button id="export" onClick={() => selectFile()}>
            <i class="bx bx-export bx-sm"></i> Export
          </button>
          <button id="import">
            <i class="bx bx-import bx-sm"></i> Import
          </button>
          <button id="excel">
            <i class="bx bxs-file-doc bx-sm"></i> Excel
          </button>
          <input
            type="file"
            accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
            hidden
            id="file"
            onChange={(e) => getFile(e)}
          />
        </div>
        <div className="tabla">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Codigo</th>
                <th scope="col">Nombre</th>
                <th scope="col">Celular</th>
                <th scope="col">Correo</th>
                <th scope="col">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => {
                return (
                  <tr>
                    <th>{student.code}</th>
                    <td>{student.name}</td>
                    <td>{student.phone}</td>
                    <td>{student.email}</td>
                    <td>
                      <i
                        onClick={() => setDataForm(usuario)}
                        className="bx bxs-edit bx-sm"
                      ></i>
                      <i
                        onClick={() => deleteById(student.id)}
                        className="bx bxs-trash bx-sm"
                      ></i>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default Home;
