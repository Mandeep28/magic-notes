import React, { useContext } from "react";
import noteContext from "../../context/notes/noteContext";

const NoteItem = (props) => {
  const { note, updatenote } = props;
  const { deleteNote } = useContext(noteContext);
  return (
    <div className="card col-md-auto my-4 mx-2 shadow-lg" style={{ width: "18rem" }}>
      <div className="card-body">
        <div className="d-flex justify-content-between">
          <h5 className="card-title"> {note.title} </h5>
          <div>
            <i
              className="fa fa-pencil-square-o mx-1"
              onClick={() => {
                updatenote(note);
              }}
            ></i>
            <i
              className="fa fa-trash-o mx-1"
              onClick={() => {
                deleteNote(note._id);
              }}
            ></i>
          </div>
        </div>
        <p className="card-text"> {note.description}</p>
      </div>
    </div>
  );
};

export default NoteItem;
