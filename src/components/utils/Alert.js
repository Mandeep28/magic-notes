import React, { useContext } from "react";
import noteContext from "../../context/notes/noteContext";

const Alert = () => {
 const {alert} = useContext(noteContext);
  return (
    <div style={{ height: "50px" }}>
      {alert && (
        <div
          className={`alert alert-${alert.type} alert-dismissible fade show`}
          role="alert"
        >
          <strong className="text-capitalize mx-1">
            {alert.type === "danger" ? "Error" : alert.type}
          </strong>
          - {alert.msg}
        </div>
      )}
    </div>
  );
};

export default Alert;
