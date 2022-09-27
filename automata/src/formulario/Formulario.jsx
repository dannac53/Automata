import { Field, Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import * as Yup from "yup";
import { alert } from "../alert";
import { firestoreService } from "../firestore_service";
import { regExp } from "../utils/regExp";

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
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [values, setValues] = useState({
    name: "",
    code: "",
    date: "",
    address: "",
    tel: "",
    phone: "",
    email: "",
  });
  const [students, setStudents] = useState([]);
  const [searchParams] = useSearchParams();
  const getStudents = () => {
    firestoreService.getStudents().then((response) => {
      const data = [];
      response.docs.map((doc) => data.push({ id: doc.id, ...doc.data() }));
      setStudents(data);
    });
  };
  const getStudentById = () => {
    const studentId = searchParams.get("studentId");
    if (studentId) {
      firestoreService.getById(studentId).then((response) => {
        const { id, ...student } = response.data();
        setId(id);
        setValues(student);
      });
    }
  };
  const goList = () => {
    navigate("../");
  };
  const submit = (values) => {
    const isEdit = id.length === 0;
    if (isExists(values.code) && !isEdit) {
      alert.error("Estudiante ya existe");
    } else {
      firestoreService[isEdit ? "saveStudent" : "updateStudent"](values).then(
        () => {
          alert.success(
            `Estudiante ${isEdit ? "creado" : "actualizado"} con exito`
          );
          goList();
        }
      );
    }
  };
  const isExists = (code) => {
    const student = students.find((student) => student.code === code);
    return !!student;
  };
  useEffect(() => {
    getStudents();
    //getStudentById();
  }, []);
  return (
    <div className="all row">
      <header className="col-12">Formulario Estudiantes</header>
      <div className="card col-12">
        <Formik
          initialValues={values}
          validationSchema={validation}
          onSubmit={submit}
          enableReinitialize={true}
        >
          {({ errors, touched, isValid }) => (
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
