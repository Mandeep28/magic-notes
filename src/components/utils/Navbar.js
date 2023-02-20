import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import noteContext from "../../context/notes/noteContext";
import logo from "../../assets/images/inotebook.png";

const Navbar = () => {
  let location = useLocation();

  let navigate = useNavigate();
  const { setNotes } = useContext(noteContext);
  // handle Logout functionality
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    setNotes([]);
  };

  return (
    <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img src={logo} alt="" style={{ width: "35px", margin: "0 5px" }} />
          Magic Notes
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className={
                  location.pathname === "/" ? "nav-link active" : "nav-link"
                }
                to="/"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
          
              <Link
                className={
                  location.pathname === "/about"
                    ? "nav-link active"
                    : "nav-link"
                }
                to="/about"
              >
                About
              </Link>
            </li>
            <li className="nav-item">
            <Link
                className={
                  location.pathname === "/allnotes"
                    ? "nav-link active"
                    : "nav-link"
                }
                to="/allnotes"
              >
                All Notes
              </Link>
            </li>
          </ul>
          {!localStorage.getItem("token") ? (
            <form className="d-flex" role="search">
              <Link className="btn btn-primary mx-1" to="/login" role="button">
                Login
              </Link>
              <Link className="btn btn-success mx-1" to="/signup" role="button">
                SignUp
              </Link>
            </form>
          ) : (
            <button className="btn btn-primary" onClick={handleLogout}>
              {" "}
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
