import React, { useState } from "react";
import { useUser } from "../context/userContext/UserProvider";

import { Link, useNavigate } from "react-router-dom";

import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import axios from "axios";
import Alerta from "../Components/Alerta";

import { GoogleLogin } from "react-google-login";
import GoogleButton from "react-google-button";
import LoadingOverlay from "react-loading-overlay";
LoadingOverlay.propTypes = undefined;

//schema of validation for formik and yup
const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().min(6, "Too Short").required("Required"),
});

const LoginPage = () => {
  const { setUser } = useUser();
  const [alerta, setAlerta] = useState("");
  const [isActive, setIsActive] = useState(false);

  const navigate = useNavigate();

  //this happen when user click the button login
  const login = async (values) => {
    console.log("al inicio");
    setIsActive(true);
    try {
      const url = `${process.env.REACT_APP_API_URL}/api/users/login`;

      const { data } = await axios.post(url, values);
      localStorage.setItem("uid", JSON.stringify(data.data));

      if (data.data.name) {
        setIsActive(false);
      }

      setUser(data.data);

      Swal.fire({
        icon: "success",
        title: data.msg,
        showConfirmButton: false,
        timer: 1500,
      });

      navigate("/snippet");
    } catch (error) {
      setIsActive(false);
      console.log(error);
      setAlerta(error.response.data.msg);
    }
  };

  const googleSuccess = async (response) => {
    console.log(response);

    const dataUser = {
      name: response.profileObj.name,
      email: response.profileObj.email,
      password: response.profileObj.googleId,
    };

    try {
      const url = `${process.env.REACT_APP_API_URL}/api/users/loginGoogle`;

      const { data } = await axios.post(url, dataUser);

      console.log(data);

      localStorage.setItem("uid", JSON.stringify(data.data));

      setUser(data.data);

      // Swal.fire({
      //   icon: "success",
      //   title: data.msg,
      //   showConfirmButton: false,
      //   timer: 1500,
      // });

      navigate("/snippet");
    } catch (error) {
      setIsActive(false);
      console.log(error);
      setAlerta(error.response.data.msg);
    }
  };

  const googleFailure = (err) => {
    console.log(err);
  };

  return (
    <LoadingOverlay
      className="w-100 p-5 min-vh-94"
      active={isActive}
      spinner
      text="Loading your content..."
    >
      <div className="form-box border m-auto  shadow p-4">
        <h1 className="mb-2">LogIn with</h1>

        <div className="text-center">
          <GoogleLogin
            className="mb-3"
            clientId="863654678830-ukb20f171nddd9h3cp5dth11ivvqpfd3.apps.googleusercontent.com"
            render={(renderProps) => (
              <GoogleButton
              className="m-auto mb-3"
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
              >
                Sign in with Google
              </GoogleButton>
            )}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            isSignedIn={false}
            cookiePolicy={"single_host_origin"}
          />
        </div>

        <p className="text-center text-muted">Or Email</p>

        {alerta && <Alerta>{alerta}</Alerta>}

        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={LoginSchema}
          onSubmit={(values) => {
            login(values);
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <Field name="email" className="form-control" />
                {errors.email && touched.email ? (
                  <div className="text-center mt-2 bg-warning fw-bold p-1 rounded">
                    {errors.email}
                  </div>
                ) : null}
              </div>
              <div className="mb-3">
                <label className="form-label">Password</label>
                <Field
                  name="password"
                  className="form-control"
                  type="password"
                />
                {errors.password && touched.password ? (
                  <div className="text-center mt-2 bg-warning fw-bold p-1 rounded">
                    {errors.password}
                  </div>
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
    </LoadingOverlay>
  );
};

export default LoginPage;
