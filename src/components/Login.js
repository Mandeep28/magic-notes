import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import baseUrl from '../helper';

const Login = (props) => {
  const navigate = useNavigate();
  const { showAlert } = props;
  const hostname = baseUrl;
  // useEffect
  useEffect(() => {
    if (localStorage.getItem("token")) {
      showAlert("Please logout to current account to login", "warning");
      navigate("/");
    }
    // eslint-disable-next-line
  }, []);
  const [credential, setCredential] = useState({ email: "", password: "" });

  const handleOnChange = (e) => {
    setCredential({ ...credential, [e.target.name]: [e.target.value] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: `{"email":"${credential.email}","password":"${credential.password}"}`,
    };

    const response = await fetch(
      hostname+"api/v1/auth/login",
      options
    );
    const json = await response.json();
    if (json.status) {
      localStorage.setItem("token", json.token);
      // show Alert
      props.showAlert("Login Successfully", "success");
      navigate("/");
    } else {
      props.showAlert(json.msg, "danger");
      console.log(json);
    }
  };

  return (
    <div className="container  h-50 d-flex flex-column align-items-center">
      <h3 className="my-4">Login to Magic Notes</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
         <i className="fa fa-envelope mx-1"></i>   Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            aria-describedby="emailHelp"
            autoComplete="username"
            onChange={handleOnChange}
            value={credential.email}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
           <i className="fa fa-lock mx-1"></i> Password
          </label>
          <input
            type="password"
            name="password"
            className="form-control"
            autoComplete="current-password"
            id="password"
            onChange={handleOnChange}
            value={credential.password}
            required
          />
        </div>
    <div className="text-center">
    <button type="submit" className="btn btn-primary my-2  w-100">
          Login
        </button>
    </div>
   
      </form>
    </div>
  );
};

export default Login;
