import axios from "axios";
import React, { useEffect, useState } from "react";

import { useParams, Link } from "react-router-dom";

const VerifyPage = () => {
  const [verification, setVerification] = useState("");

  const { token } = useParams();

  useEffect(() => {
    const fetching = async () => {
      try {
        const url = `${process.env.REACT_APP_API_URL}/api/users/authenticateAcount/${token}`;
        const { data } = await axios(url);

        setVerification(data.msg);
      } catch (error) {
        console.log(error.response.data);
        setVerification(error.response.data.msg);
        console.log(error);
      }
    };

    fetching();
  }, []);

  return (
    <div className="container mt-5">
      <div className="card w-50 m-auto">
        <div className="card-body">
          <h5 className="card-title">Verification Page</h5>
          <p className="card-text">{verification}</p>
          {verification !== "Invalid token" ? (
            <Link to="/login" className="btn btn-primary">
              Go to Login
            </Link>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default VerifyPage;
