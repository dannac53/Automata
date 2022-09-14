import { Formik, Form, Field } from "formik";
import { Link } from "react-router-dom";
import "./Formulario.css";
const Formulario = () => {
  return (
    <div className="container">
      <header>Formulario Estudiantes</header>
      <div className="card">
        <Formik>
          <Form>
            <div className="col-6">
              <label>Nombre</label>
              <Field className="myForm" name="name" type="text" />
            </div>
            <div className="col-6">
              <label>Codigo</label>
              <Field className="myForm" name="code" type="text" />
            </div>
            <div className="col-6">
              <label>Fecha de Ingreso</label>
              <Field className="myForm" name="date" type="text" />
            </div>
            <div className="col-6">
              <label>Direccion</label>
              <Field className="myForm" name="add" type="text" />
            </div>
            <div className="col-6">
              <label>Telefono</label>
              <Field className="myForm" name="tel" type="text" />
            </div>
            <div className="col-6">
              <label>Celular</label>
              <Field className="myForm" name="cel" type="text" />
            </div>
            <div className="col-6">
              <label>Correo</label>
              <Field className="myForm" name="Email" type="text" />
            </div>
          </Form>
        </Formik>
        <Link>Cancelar</Link>
        <button>Guardar</button>
      </div>
    </div>
  );
};
export default Formulario;
