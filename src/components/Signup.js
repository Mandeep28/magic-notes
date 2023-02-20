import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Signup = (props) => {
  const navigate = useNavigate();
  const { showAlert } = props;
  // useEffect
  useEffect(() => {
    if (localStorage.getItem("token")) {
      props.showAlert("Please logout to current account to Signup", "warning");
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
      console.log("password", password);
      console.log("conform password", cpassword);
      return showAlert("password not match", "warning");
    }
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: `{"name":"${name}","email":"${email}","password":"${password}"}`,
    };

    const response = await fetch(
      "http://localhost:5000/api/v1/auth/createuser",
      options
    );
    const json = await response.json();
    if (json.status) {
      console.log("sign up done");

      localStorage.setItem("token", json.token);
      navigate("/");
      // show Alert
      showAlert("Account created Successfully", "success");
    } else {
      showAlert(json.msg, "danger");
      console.log(json);
    }
    // console.log(json);
  };
  return (
    <div className="container  h-50 d-flex flex-column align-items-center">
      {" "}
      <h3 className="my-4">Create An Account to use Magic Notes</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
          <i className="fa fa-user mx-1"></i>  Enter you name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            onChange={handleOnChange}
            value={credential.name}
            required
          />
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
            value={credential.cpassword}
            required
          />
        </div>
      <div className="text-center">
      <button type="submit" className="btn btn-success w-100 my-1">
          Signup
        </button>
      </div>
  
      </form>
    </div>
  );
};

export default Signup;
