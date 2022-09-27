import "./Home.css";
import { convertExcelToArray, convertArrayToFile } from "../utils/excel";
import { Link, useNavigate, createSearchParams } from "react-router-dom";
import { validate } from "../utils/validate";
import { firestoreService } from "../firestore_service";
import { useState } from "react";
import { useEffect } from "react";
import { alert } from "../alert";

const Home = () => {
  const navigate = useNavigate();
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
    if (name.length === 0) setStudents(copy);
    else {
      const expresion = new RegExp(`${name}.*`, "i");
      const result = students.filter((student) => expresion.test(student.name));
      setStudents(result);
    }
  };

  const getFile = (event) => {
    const file = event.target.files[0];
    convertExcelToArray(file, (result) => validate(result));
  };
  const exportStudents = () => {
    const data = [];
    students.map((student) => {
      const object = {
        Nombre: student.name,
        Codigo: student.code,
        FechaIngreso: student.date,
        Direccion: student.address,
        Telefeono: student.tel,
        Celular: student.phone,
        Correo: student.email,
      };
      data.push(object);
    });
    convertArrayToFile(data);
  };
  const selectFile = () => {
    document.getElementById("file").click();
  };
  const donwloadExcelFile = () => document.getElementById("excelFile").click();

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
          <i className="bx bx-search bx-sm" id="icon"></i>
          <Link to="/formulario" className="addstudent">
            Add student
            <i className="bx bx-user-plus bx-sm" id="icon2"></i>
          </Link>
        </div>
        <div className="btn">
          <button id="import" onClick={() => selectFile()}>
            <i className="bx bx-import bx-sm"></i> Import
          </button>
          <button id="export" onClick={() => exportStudents()}>
            <i className="bx bx-export bx-sm"></i> Export
          </button>
          <a
            href="../public/Students.xlsx"
            hidden
            id="excelFile"
            download="ExcelDemo.xlsx"
          ></a>
          <button id="excel" onClick={() => donwloadExcelFile()}>
            <i className="bx bxs-file-doc bx-sm"></i> Excel
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
                <th>Codigo</th>
                <th>Nombre</th>
                <th>Celular</th>
                <th>Correo</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => {
                return (
                  <tr key={student.id}>
                    <th>{student.code}</th>
                    <td>{student.name}</td>
                    <td>{student.phone}</td>
                    <td>{student.email}</td>
                    <td>
                      <i
                        onClick={() =>
                          navigate({
                            pathname: "/formulario",
                            search: createSearchParams({
                              studentId: student.id,
                            }).toString(),
                          })
                        }
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
