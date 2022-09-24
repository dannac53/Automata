import * as xlsx from "xlsx";
const convertExcelToArray = (file, callback) => {
  let workBook = null;
  let jsonData = null;
  const reader = new FileReader();
  reader.onload = () => {
    const data = reader.result;
    workBook = xlsx.read(data, { type: "binary" });
    jsonData = workBook.SheetNames.reduce((initial, name) => {
      const sheet = workBook.Sheets[name];
      initial[name] = xlsx.utils.sheet_to_json(sheet);
      return initial;
    }, {});
    const rows = jsonData[Object.keys(jsonData)[0]].map((row) => {
      return {
        code: row?.Codigo,
        name: row?.Nombre,
        date: row?.Fecha,
        address: row?.Direccion,
        tel: row?.Telefono,
        phone: row?.Celular,
        email: row?.Correo,
      };
    });
    callback(rows);
  };
  reader.readAsBinaryString(file);
};

const convertArrayToFile = (data) => {
  const fileName = "Estudiantes";
  let reader = new FileReader();
  const EXCEL_TYPE =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const EXCEL_EXTENSION = ".xlsx";
  const worksheet = xlsx.utils.json_to_sheet(data);
  const workBook = {
    Sheets: { data: worksheet },
    SheetNames: ["data"],
  };
  const excelBuffer = xlsx.write(workBook, {
    bookType: "xlsx",
    type: "array",
  });
  const file = new Blob([excelBuffer], { type: EXCEL_TYPE });
  const a = document.createElement("a");
  a.style.display = "none";
  reader.readAsDataURL(file);
  reader.onload = (response) => {
    a.href = response.target.result.toString();
    a.download = `${fileName}${EXCEL_EXTENSION}`;
    a.click();
    a.remove();
  };
};

export { convertExcelToArray, convertArrayToFile };
