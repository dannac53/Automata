import { Formik, Form, Field } from "formik";
import { Link } from "react-router-dom";

const validacion = document.getElementById("validacion");
const inputs = document.querySelectorAll("#validacion input");

const expresiones = {
  usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
  nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
  correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
  telefono: /^\d{7,14}$/, // 7 a 14 numeros.
};

const Formulario = () => {
  const values = {
    name: "",
    code: "",
    date: "",
    add: "",
    tel: "",
    cel: "",
    gmail: "",
  };
  const submit = (values) => {
    console.log(values);
  };
  return (
    <div className="all row">
      <header className="col-12">Formulario Estudiantes</header>
      <div className="card col-12">
        <Formik initialValues={values} onSubmit={submit}>
          <Form className="row" id="validacion">
            <div className="col-12 group">
              <label>Nombre</label>
              <Field
                className="myForm"
                id="name"
                name="name"
                type="text"
                placeholder="Regina Falange..."
              />
            </div>
            <div className="col-6 group">
              <label>Codigo</label>
              <Field
                className="myForm"
                id="code"
                name="code"
                type="text"
                placeholder="33898..."
              />
            </div>
            <div className="col-6 group">
              <label>Fecha de Ingreso</label>
              <Field className="myForm" id="date" name="date" type="date" />
            </div>
            <div className="col-10 group">
              <label>Direccion</label>
              <Field
                className="myForm"
                id="add"
                name="add"
                type="text"
                placeholder="socorro mz 49..."
              />
            </div>
            <div className="col-6 group">
              <label>Telefono</label>
              <Field
                className="myForm"
                id="tel"
                name="tel"
                type="text"
                placeholder="6629..."
              />
            </div>
            <div className="col-6 group">
              <label>Celular</label>
              <Field
                className="myForm"
                id="cel"
                name="cel"
                type="text"
                placeholder="30463..."
              />
            </div>
            <div className="col-12 group">
              <label>Correo</label>
              <Field
                className="myForm"
                id="Email"
                name="Email"
                type="text"
                placeholder="reginafalange@..."
              />
            </div>
          </Form>
        </Formik>
        <div className=" btn ">
          <Link to="/">Cancelar</Link>
          <button type="submit">Guardar</button>
        </div>
      </div>
    </div>
  );
};
export default Formulario;
