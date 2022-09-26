import "./Home.css";
import { convertExcelToArray } from "../utils/excel";
import { Link } from "react-router-dom";
import { validate } from "../utils/validate";
import { firestoreService } from "../firestore_service";

const Home = () => {
  const getFile = (event) => {
    const file = event.target.files[0];
    convertExcelToArray(file, (result) => {
      console.log(result);
    });
  };
  const selectFile = () => {
    document.getElementById("file").click();
  };
  return (
    <div className="all row">
      <header className="col-12">Tabla Estudiantes</header>
      <div className="card col-12" id="tarjeta">
        <div className="seccion">
          <input
            className="search col-6"
            type="text"
            name=""
            id=""
            placeholder="Search"
          />
          <i class="bx bx-search bx-sm" id="icon"></i>
          <Link to="/formulario" className="btn-lg" id="adduser">
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
              <tr>
                <th scope="col"></th>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
                <td>
                  <i
                    onClick={() => setDataForm(usuario)}
                    className="bx bxs-edit bx-sm"
                  ></i>
                  <i
                    onClick={() => deleteById(usuario.id)}
                    className="bx bxs-trash bx-sm"
                  ></i>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default Home;
