import "./Home.css";
import { convertExcelToArray } from "../utils/excel";
import { validate } from "../utils/validate";

const Home = () => {
  const getFile = (event) => {
    const file = event.target.files[0];
    convertExcelToArray(file, (result) => validate(result));
  };
  const selectFile = () => {
    document.getElementById("file").click();
  };
  return (
    <div className="all row">
      <header className="col-12">Tabla Estudiantes</header>
      <div className="card col-12">
        <div className="seccion">
          <input className="search col-6" type="text" placeholder="Search" />
          <i class="bx bx-search bx-sm" id="icon"></i>
          <button className="btn-primary btn-lg" id="adduser">
            Add user +
          </button>
        </div>
        <header className="title"> Suppliers</header>
        <button id="export" onClick={() => selectFile()}>
          <i className="bx bx-export bx-sm"></i>Importar
        </button>
        <button id="import">
          <i className="bx bx-import bx-sm"></i>Exportar
        </button>
        <input
          type="file"
          accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
          hidden
          id="file"
          onChange={(e) => getFile(e)}
        />
        <div className="tabla">
          <table className="table">
            <thead>
              <tr>
                <th></th>
                <th>First</th>
                <th>Last</th>
                <th>Handle</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>
                  <input type="checkbox" />
                </th>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
              </tr>
              <tr>
                <th>
                  <input type="checkbox" />
                </th>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
              </tr>
              <tr>
                <th>
                  <input type="checkbox" />
                </th>
                <td>Larry the Bird</td>
                <td>@twitter</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default Home;
