import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);
const confirmButtonText = "Aceptar";
const cancelButtonText = "Cancelar";

const alert = {
  success: (text) =>
    MySwal.fire({
      title: "Exito",
      confirmButtonText,
      showCancelButton: false,
      text,
      icon: "success",
    }),
  error: (text) =>
    MySwal.fire({
      title: "Error",
      confirmButtonText,
      showCancelButton: false,
      text,
      icon: "error",
    }),
  confirmDelete: () =>
    MySwal.fire({
      title: "Esta segur@?",
      text: "Desea eliminar este registro?",
      confirmButtonText,
      cancelButtonText,
      icon: "warning",
      showCancelButton: true,
    }),
  infoWithHtml: (tr) => {
    MySwal.fire({
      title: "Estudiantes no validos",
      html: `<table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Codigo</th>
            <th>Fecha de ingreso</th>
            <th>Correo</th>
          </tr>
        </thead>
        <tbody>${tr}</tbody>
      </table>`,
      confirmButtonText,
      icon: "warning",
      showCancelButton: false,
    });
  },
};
export { alert };
