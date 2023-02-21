import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import noteContext from "../context/notes/noteContext";

const Signup = () => {
  const navigate = useNavigate();
  const [btnLoading, setBtnLoading] = useState(false);
  const { showAlert, fetchFromServer } = useContext(noteContext);
  // useEffect
  useEffect(() => {
    if (localStorage.getItem("token")) {
      showAlert("Please logout to current account to Signup", "warning");
      navigate("/");
    }
    // eslint-disable-next-line
  }, []);
  const [credential, setCredential] = useState({
    email: "",
    password: "",
    name: "",
    cpassword: "",
  });

  const handleOnChange = (e) => {
    setCredential({ ...credential, [e.target.name]: [e.target.value] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, cpassword } = credential;
    if (password[0] !== cpassword[0]) {
      return showAlert("password not match", "warning");
    }
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: `{"name":"${name}","email":"${email}","password":"${password}"}`,
    };
    try {
      setBtnLoading(true);
      const json = await fetchFromServer("/api/v1/auth/createuser", options);
      if (json.status) {
        localStorage.setItem("token", json.token);
        navigate("/");
        // show Alert
        showAlert("Account created Successfully", "success");
      } else {
        showAlert(json.msg, "danger");
      }
      setBtnLoading(false);
    } catch (e) {
      showAlert("Something Went wrong ", "warning");
      setBtnLoading(false);
    }
  };



  return (
    <div className="container  h-50 d-flex flex-column align-items-center">
      <h3 className="my-4 text-center">Create An Account to use Magic Notes</h3>
      <form onSubmit={handleSubmit}  >
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            <i className="fa fa-user mx-1"></i> Enter you name
          </label>
          <input
            type="text"
            className="form-control "
            id="name"
            name="name"
            onChange={handleOnChange}
            value={credential.name}
            required
          />
             <div className="invalid-feedback">
            This field is required
      </div>
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            <i className="fa fa-envelope mx-1"></i> Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            autoComplete="username"
            aria-describedby="emailHelp"
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
            id="password"
            autoComplete="new-password"
            onChange={handleOnChange}
            value={credential.password}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            <i className="fa fa-lock mx-1"></i> Cofirm Password
          </label>
          <input
            type="password"
            name="cpassword"
            className="form-control"
            id="cpassword"
             onChange={handleOnChange}
             autoComplete="new-password"
            value={credential.cpassword}
            required
          />
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="btn btn-success w-100 my-1"
            disabled={btnLoading}
          >
            <span
              className={btnLoading ? "spinner-border spinner-border-sm" : ""}
            ></span>{" "}
            SignUp
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
