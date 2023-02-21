import React, { useState, useContext } from "react";
import noteContext from "../../context/notes/noteContext";

const AddNote = (props) => {
  const { addNote ,btnLoading, setBtnLoading } = useContext(noteContext);
  const [note, setNote] = useState({ title: "", description: "", tag: "" });

  const handleOnChange = (e) => {
    setNote({ ...note, [e.target.name]: [e.target.value] });
  };

  const handleOnClick = async(e) => {
    e.preventDefault();
    setBtnLoading(true);
   await addNote(note.title, note.description, note.tag);
    setNote({ title: "", description: "", tag: "" });
    setBtnLoading(false);
    // props.showAlert("Note added successufully ", "success");
  };

  return (
    <div>
      <div className="container my-4 ">
        <h2 className="text-capitalize">Add a Note to your Magic Notebook</h2>
        <form onSubmit={handleOnClick}>
          <div className="mb-3 ">
            <label htmlFor="title" className="form-label">
            <i className="fa fa-file mx-1"></i>  Enter Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              onChange={handleOnChange}
              minLength={5}
              required
              value={note.title}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
            <i className="fa fa-file-text-o mx-1"></i> Enter Description
            </label>
            <textarea
              id="description"
              name="description"
              className="form-control"
              onChange={handleOnChange}
              minLength={5}
              maxLength={200}
              required
              value={note.description}
            ></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">
            <i className="fa fa-tag mx-1"></i> Enter Tag
            </label>
            <input
              type="text"
              className="form-control"
              id="tag"
              name="tag"
              onChange={handleOnChange}
              value={note.tag}
            />
          </div>

          <button type="submit" className="btn btn-primary" disabled={btnLoading}>
          <span className={btnLoading ? "spinner-border spinner-border-sm" : ""}></span> Add To Note
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNote;
