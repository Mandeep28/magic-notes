import React, {useEffect} from "react";
import { useNavigate } from "react-router-dom";
import AddNote from "./notes/AddNote";

const Home = (props) => {
  const { showAlert } = props;
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    } 
    // eslint-disable-next-line
  }, []);
  return (
    <div>
      <AddNote showAlert={showAlert} />

     
    </div>
  );
};

export default Home;
