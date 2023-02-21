import { useState } from "react";
import baseUrl from "../../helper";
import noteContext from "./noteContext";

// import { useEffect, useState } from "react";

const NoteState = (props) => {
  const [notes, setNotes] = useState([]);
  const [alert , setAlert] = useState(null);
  const [btnLoading, setBtnLoading] = useState(false);

  const hostName = baseUrl;


  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 3000);
  };


// fetch data from server 
const fetchFromServer = async(endPoint, options) =>{
  let url = hostName + endPoint;
  try {
    const fetchData = await fetch(url, options );
    const json = await fetchData.json();
    return json;
  } catch (error) {
    
    // console.log(error);
    const json= {
      status: false,
    }
    return json;
    
  }

}

  

  // Get All Notes
  const getNotes = async () => {
    const options = {
      method: "GET",
      headers: {
        "auth-token": localStorage.getItem("token"),
      },
    };

    const result = await fetchFromServer("/api/v1/notes/fetchnotes", options);
    if(result.status) {

      setNotes(result.notes);
    }
    else {
      showAlert("Something Went Wrong", "warning");
    }
    // console.log(json);
    // console.log("get all notes");
  };

  // Add a note
  const addNote = async (title, description, tag) => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: `{"title":"${title}","description":"${description}","tag":"${tag}"}`,
    };
    const result = await fetchFromServer("/api/v1/notes/addnote", options);
    if(result.status) {

      setNotes(notes.concat(result.notes));
      showAlert("Note Added Successfully", "success");
    }
  };

  // Delete a note
  const deleteNote = async (id) => {
    // client side functionality
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    // console.log(newNotes);
    showAlert("Note delete successfully", "success");
    setNotes(newNotes);

    // Api call 

    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    };

    await fetchFromServer(`/api/v1/notes/deletenote${id}`, options);
  
  };

  // Edit a note

  const editNote = async (id, title, description, tag) => {
    // client side update
    const newNotes = [...notes];
    // console.log(newNotes);

    newNotes.map((note) => {
      if (note._id === id) {
        note.title = title;
        note.description = description;
        note.tag = tag;
      }
      return note;
    });

    setNotes(newNotes);
    showAlert("Note Upate successfully", "success");

    // api call
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: `{"title":"${title}","description":"${description}","tag":"${tag}"}`,
    };

   await fetchFromServer(`/api/v1/notes/updatenote${id}`,options);
    
  };
  //
  return (
    <noteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, getNotes, setNotes, showAlert, alert ,btnLoading, setBtnLoading, fetchFromServer }}
    >
      {props.children}
    </noteContext.Provider>
  );
};

export default NoteState;
