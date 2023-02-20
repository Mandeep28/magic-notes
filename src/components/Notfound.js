import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import pageNotFound from "../assets/images/pageNotFound.jpg";

const Notfound = (props) => {
  useEffect(() => {
    props.handleSetShowNav(false);
    // eslint-disable-next-line
  }, []);

  return (
    <div className="container " style={{ textAlign: "center" }}>
      <img src={pageNotFound} alt="" />
      <div>
        <Link
          className="btn btn-primary my-4"
          to={"/"}
          onClick={() => {
            props.handleSetShowNav(true);
          }}
        >
          {" "}
          Go to Home
        </Link>
      </div>
    </div>
  );
};

export default Notfound;
