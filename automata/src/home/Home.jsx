import "./Home.css";
import { convertExcelToArray } from "../utils/excel";

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
      <div className="card col-12">
        <div className="seccion">
          <input
            className="search col-6"
            type="text"
            name=""
            id=""
            placeholder="Search"
          />
          <i class="bx bx-search bx-sm" id="icon"></i>
          <button className="btn-primary btn-lg" id="adduser">
            Add user +
          </button>
        </div>
        <header className="title"> Suppliers</header>
        <button id="export" onClick={() => selectFile()}>
          <i class="bx bx-export bx-sm"></i>Export
        </button>
        <button id="import">
          <i class="bx bx-import bx-sm"></i>import
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
                <th scope="col"></th>
                <th scope="col">First</th>
                <th scope="col">Last</th>
                <th scope="col">Handle</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="col">
                  <input type="checkbox" />
                </th>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
              </tr>
              <tr>
                <th scope="col">
                  <input type="checkbox" />
                </th>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
              </tr>
              <tr>
                <th scope="col">
                  <input type="checkbox" />
                </th>
                <td colspan="2">Larry the Bird</td>
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
