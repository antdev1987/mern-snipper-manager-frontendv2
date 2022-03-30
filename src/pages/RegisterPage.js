import React, { useState } from "react";

import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Link,useNavigate } from "react-router-dom";
import axios from 'axios'
import Swal from 'sweetalert2'
import Alerta from "../Components/Alerta";

const LoginSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().min(6, "Too Short").required("Required"),
});


const RegisterPage = () => {

 
  const [alerta,setAlerta] = useState('')

  const navigate = useNavigate()

 // const {registerfn} = useUser()
 const register = async(inputs)=>{

  try {
      const url = `${process.env.REACT_APP_API_URL}/api/users`
      const {data} = await axios.post(url,inputs)
      console.log(data)
      Swal.fire({
          icon: 'success',
          title: data.msg,
          showConfirmButton: false,
          timer: 1500
      }).then((result)=>{
        console.log(result)
        navigate('/login')
      })

  } catch (error) {
      console.log(error.message)
      setAlerta(error.response.data.msg)
  }

}


    


  return (
    <div className="form-box border m-auto mt-5 shadow p-4">
      <h1 className="mb-3">Create an Account</h1>

      {alerta && <Alerta>{alerta}</Alerta>}

      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
        }}
        validationSchema={LoginSchema}
        onSubmit={(values) => {
          // same shape as initial values
          console.log(values);
          register(values)
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <div className="mb-3">
              <label className="form-label">Name</label>
              <Field name="name" type="text" className="form-control" />

              {errors.name && touched.name ? <div
              className="text-center mt-2 bg-warning fw-bold p-1 rounded">{errors.name}</div> : null}
            </div>

            <div className="mb-3">
              <label className="form-label">Email</label>
              <Field name="email" className="form-control" />
              {errors.email && touched.email ? <div className="text-center mt-2 bg-warning fw-bold p-1 rounded">{errors.email}</div> : null}
            </div>

            <div className="mb-3">
              <label className="form-label">Password</label>
              <Field name="password" className="form-control" type="password" />
              {errors.password && touched.password ? (
                <div className="text-center mt-2 bg-warning fw-bold p-1 rounded">{errors.password}</div>
              ) : null}
            </div>

            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </Form>
        )}
      </Formik>
      <Link className="mt-4 d-block text-decoration-none" to="/login">
        Login
      </Link>
    </div>
  );
};

export default RegisterPage;
