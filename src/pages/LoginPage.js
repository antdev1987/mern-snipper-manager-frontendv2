import React, { useState } from "react";
import { useUser } from "../context/userContext/UserProvider";

import { Link,useNavigate } from "react-router-dom";

import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Swal from 'sweetalert2'
import axios from "axios";
import Alerta from "../Components/Alerta";


//schema of validation for formik and yup
const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().min(6, "Too Short").required("Required"),
});

const LoginPage = () => {

  const {setUser} = useUser()
  const [alerta,setAlerta] = useState('')
 
  const navigate = useNavigate()

  const login = async(values)=>{

    try {
      const url = `${process.env.REACT_APP_API_URL}/api/users/login`

      const {data} = await axios.post(url,values)
      console.log(data)
      localStorage.setItem('uid',JSON.stringify(data.data))

      setUser(data.data)

      Swal.fire({
        icon: 'success',
        title: data.msg,
        showConfirmButton: false,
        timer: 1500
    })

    navigate('/snippet')

    } catch (error) {
      console.log(error)
      setAlerta(error.response.data.msg)
    }

  }

  console.log('in login page')

  return (
    <div className="form-box border m-auto mt-5 shadow p-4">
      <h1 className="mb-3">LogIn</h1>
    
      {alerta && <Alerta>{alerta}</Alerta>}

      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={LoginSchema}
        onSubmit={(values) => {
          // same shape as initial values
          login(values)
        }}
      >
        {({ errors, touched }) => (
          <Form>
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

      <Link className="mt-4 d-block text-decoration-none" to="/register">
        Register
      </Link>
    </div>
  );
};

export default LoginPage;
