import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import noteContext from "../../context/notes/noteContext";
import NoteItem from "./NoteItem";

const Notes = (props) => {
  const { getNotes, notes, editNote } = useContext(noteContext);
  const ref = useRef(null);
  const refClose = useRef(null);
  const [note, setNote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "",
  });
  const navigate = useNavigate();
  // get all notes
  useEffect(() => {
    if (localStorage.getItem("token")) {
      getNotes();
    } else {
      navigate("/login");
    }
    // eslint-disable-next-line
  }, []);
  //
  const updatenote = (currentNote) => {
    ref.current.click();
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    });
  };

  const handleOnChange = (e) => {
    setNote({ ...note, [e.target.name]: [e.target.value] });
  };

  const handleOnClick = (e) => {
    e.preventDefault();
    refClose.current.click();
    // console.log("update note ", note);
    editNote(note.id, note.etitle, note.edescription, note.etag);

  };

  return (
    <div>
      <button
        type="button"
        ref={ref}
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit Note
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleOnClick}>
                <div className="mb-3 ">
                  <label htmlFor="etitle" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    onChange={handleOnChange}
                    minLength={5}
                    required
                    value={note.etitle}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">
                    Description
                  </label>
                  <textarea
                    id="edescription"
                    className="form-control"
                    aria-label="With textarea"
                    name="edescription"
                    onChange={handleOnChange}
                    minLength={5}
                    required
                    value={note.edescription}
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">
                    Tag
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etag"
                    name="etag"
                    onChange={handleOnChange}
                    value={note.etag}
                  />
                </div>
                <div className="btn-container d-flex justify-content-end">
                  <button
                    type="button"
                    ref={refClose}
                    className="btn btn-secondary mx-2"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Update Note
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/*  modal end */}
      <div className="container">
        <h2 className="my-2">Your notes</h2>
        {notes.length === 0 && "no notes to show ... please add some notes"}
        <div className="row">
          {notes.map((note) => {
            return (
              <NoteItem
                key={note._id}
                updatenote={updatenote}
                note={note}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Notes;
