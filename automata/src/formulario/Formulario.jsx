import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { regExp } from "../utils/regExp";
import { firestoreService } from "../firestore_service";
import { alert } from "../alert";
import { useEffect, useState } from "react";

const validation = Yup.object().shape({
  name: Yup.string().matches(regExp.name, "Nombre no valido").required(),
  code: Yup.string().matches(regExp.code, "Codigo no valido").required(),
  date: Yup.string().matches(regExp.date, "Fecha no valida").required(),
  address: Yup.string()
    .matches(regExp.address, "Direccion no valida")
    .required(),
  tel: Yup.string().matches(regExp.tel, "Telefono no valido").required(),
  phone: Yup.string().matches(regExp.phone, "Celular no valido").required(),
  email: Yup.string().matches(regExp.email, "Correo no valido").required(),
});

const Formulario = () => {
  const [students, setStudents] = useState([]);
  const getStudents = () => {
    firestoreService.getStudents().then((response) => {
      const data = [];
      response.docs.map((doc) => data.push({ id: doc.id, ...doc.data() }));
      setStudents(data);
    });
  };
  const navigate = useNavigate();
  const values = {
    name: "",
    code: "",
    date: "",
    address: "",
    tel: "",
    phone: "",
    email: "",
  };
  const goList = () => {
    navigate("../");
  };
  const submit = (values) => {
    if (isExists(values.code)) {
      alert.error("Estudiante ya existe");
    } else {
      firestoreService.saveStudent(values).then(() => {
        alert.success("Estudiante creado con exito");
        goList();
      });
    }
  };
  const isExists = (code) => {
    return !!students.find((student) => student.code === code);
  };
  useEffect(() => getStudents(), []);
  return (
    <div className="all row">
      <header className="col-12">Formulario Estudiantes</header>
      <div className="card col-12">
        <Formik
          initialValues={values}
          validationSchema={validation}
          onSubmit={submit}
        >
          {({ errors, touched, dirty, isValid }) => (
            <Form className="row" id="validacion">
              <div
                className={`col-12 group ${errors.name ? "groupError" : ""}`}
              >
                <label>Nombre</label>
                <Field
                  className="myForm"
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Regina Falange..."
                />
                {errors.name && touched.name ? (
                  <div className="textError">{errors.name}</div>
                ) : null}
              </div>
              <div className={`col-6 group ${errors.code ? "groupError" : ""}`}>
                <label>Codigo</label>
                <Field
                  className="myForm"
                  id="code"
                  name="code"
                  type="text"
                  placeholder="33898..."
                />
                {errors.code && touched.code ? (
                  <div className="textError">{errors.code}</div>
                ) : null}
              </div>
              <div className={`col-6 group ${errors.date ? "groupError" : ""}`}>
                <label>Fecha de Ingreso</label>
                <Field className="myForm" id="date" name="date" type="date" />
                {errors.date && touched.date ? (
                  <div className="textError">{errors.date}</div>
                ) : null}
              </div>
              <div
                className={`col-10 group ${errors.address ? "groupError" : ""}`}
              >
                <label>Direccion</label>
                <Field
                  className="myForm"
                  id="address"
                  name="address"
                  type="text"
                  placeholder="socorro mz 49..."
                />
                {errors.address && touched.address ? (
                  <div className="textError">{errors.address}</div>
                ) : null}
              </div>
              <div className={`col-6 group ${errors.tel ? "groupError" : ""}`}>
                <label>Telefono</label>
                <Field
                  className="myForm"
                  id="tel"
                  name="tel"
                  type="text"
                  placeholder="6629..."
                />
                {errors.tel && touched.tel ? (
                  <div className="textError">{errors.tel}</div>
                ) : null}
              </div>
              <div
                className={`col-6 group ${errors.phone ? "groupError" : ""}`}
              >
                <label>Celular</label>
                <Field
                  className="myForm"
                  id="phone"
                  name="phone"
                  type="text"
                  placeholder="30463..."
                />
                {errors.phone && touched.phone ? (
                  <div className="textError">{errors.phone}</div>
                ) : null}
              </div>
              <div
                className={`col-12 group ${errors.email ? "groupError" : ""}`}
              >
                <label>Correo</label>
                <Field
                  className="myForm"
                  id="email"
                  name="email"
                  type="text"
                  placeholder="reginafalange@..."
                />
                {errors.email && touched.email ? (
                  <div className="textError">{errors.email}</div>
                ) : null}
              </div>
              <div className=" btn ">
                <Link to="/">Cancelar</Link>
                <button type="submit" disabled={!isValid}>
                  Guardar
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
export default Formulario;
