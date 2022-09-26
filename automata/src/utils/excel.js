import * as xlsx from "xlsx";
const convertExcelToArray = (file, callback) => {
  let workBook = null;
  let jsonData = null;
  const reader = new FileReader();
  const options = {
    header: 1,
    defval: "",
    blankrows: true,
    raw: false,
    dateNF: 'd"/"m"/"yyyy',
  };
  reader.onload = () => {
    const data = reader.result;
    workBook = xlsx.read(data, { type: "binary" });
    jsonData = workBook.SheetNames.reduce((initial, name) => {
      const sheet = workBook.Sheets[name];
      initial[name] = xlsx.utils.sheet_to_json(sheet, options);
      return initial;
    }, {});
    const rows = jsonData[Object.keys(jsonData)[0]].map((row) => {
      return {
        name: row[0],
        code: row[1],
        date: row[2],
        address: row[3],
        tel: row[4],
        phone: row[5],
        email: row[6],
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
