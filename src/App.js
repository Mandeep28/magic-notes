// EXTERNAL PACKAGES
import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
// COMPONENTS
import Home from "./components/Home";
import About from "./components/About";
import NoteState from "./context/notes/NoteState";
import Navbar from "./components/utils/Navbar";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Alert from "./components/utils/Alert";
import Notfound from "./components/Notfound";
import AllNotes from "./components/AllNotes";

function App() {
  const [showNav, setShowNav] = useState(true);

  const handleSetShowNav = (value) => {
    setShowNav(value);
  };



  return (
    <>
      <NoteState>
        <BrowserRouter>
          {showNav && <Navbar />}
          <Alert />

          <Routes>
            <Route exact path="/" element={<Home  />} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/allnotes" element={<AllNotes />} />
            <Route
              exact
              path="/login"
              element={<Login  />}
            />
            <Route
              exact
              path="/signup"
              element={<Signup  />}
            />
            <Route
              path="*"
              element={<Notfound handleSetShowNav={handleSetShowNav} />}
            />
          </Routes>
        </BrowserRouter>
      </NoteState>
    </>
  );
}

export default App;
