import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import noteContext from "../context/notes/noteContext";

const Login = () => {
  const navigate = useNavigate();
  const [btnLoading, setBtnLoading] = useState(false);
  const {showAlert, fetchFromServer} = useContext(noteContext);
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
    try {

      setBtnLoading(true);
      const json = await fetchFromServer("/api/v1/auth/login", options);
 
  

    if (json.status) {
      localStorage.setItem("token", json.token);
      // show Alert
      showAlert("Login Successfully", "success");
      navigate("/");
    } else {
      showAlert(json.msg, "danger");
    }
    setBtnLoading(false);
  }catch(e) {
      showAlert("Something Went wrong", "warning");
      setBtnLoading(false);
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
    <button type="submit" className="btn btn-primary my-2  w-100" disabled={btnLoading}>
    <span className={btnLoading ? "spinner-border spinner-border-sm" : ""}></span> login
        </button>
    </div>
   
      </form>
    </div>
  );
};

export default Login;
