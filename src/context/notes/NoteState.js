import { useState } from "react";
import baseUrl from "../../helper";
import noteContext from "./noteContext";

// import { useEffect, useState } from "react";

const NoteState = (props) => {
  const [notes, setNotes] = useState([]);
  const hostName = baseUrl;
  

  // Get All Notes
  const getNotes = async () => {
    const options = {
      method: "GET",
      headers: {
        "auth-token": localStorage.getItem("token"),
      },
    };

    const fetchData = await fetch(
      hostName + "/api/v1/notes/fetchnotes",
      options
    );
    const json = await fetchData.json();
    // console.log(json);
    setNotes(json.notes);
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

    const response = await fetch(hostName + "/api/v1/notes/addnote", options);
    const json = await response.json();
    console.log(json);

    // console.log("note added");

    setNotes(notes.concat(json.notes));
  };

  // Delete a note
  const deleteNote = async (id) => {
    // client side functionality
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    // console.log(newNotes);
    setNotes(newNotes);
    // console.log("note deleted");

    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    };

    const response = await fetch(
      hostName + `/api/v1/notes/deletenote${id}`,
      options
    );
    const json = await response.json();
    console.log(json);

    // console.log("note deleted");
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

    // api call
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: `{"title":"${title}","description":"${description}","tag":"${tag}"}`,
    };

    const response = await fetch(
      hostName + `/api/v1/notes/updatenote${id}`,
      options
    );
    const json = await response.json();
    console.log(json);
  };
  //
  return (
    <noteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, getNotes, setNotes }}
    >
      {props.children}
    </noteContext.Provider>
  );
};

export default NoteState;
