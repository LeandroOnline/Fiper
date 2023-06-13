import Note from "./Note";
import "./Notes.css";
import add from "../assets/agregar.png";
import useGlobalStore from "../store/Store";
import { useEffect, useState } from "react";
import cancel from "../assets/cancelar.png";
import ok from "../assets/correcto.png";
import axiosAddNote from "../api/axiosAddNote";

const Notes = () => {
  const storeGetNotes = useGlobalStore((state) => state.storeGetNotes);
  const noteDeletedOrUpdate = useGlobalStore(
    (state) => state.noteDeletedOrUpdate
  );
  const notes = useGlobalStore((state) => state.notes);
  const [addNoteMenu, setAddNoteMenu] = useState(false);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [sendNote, setSendNote] = useState(false);

  useEffect(() => {
    storeGetNotes();
  }, [sendNote, noteDeletedOrUpdate]);

  const addNote = async (title, text) => {
    await axiosAddNote(title, text).then((e) => {
      setAddNoteMenu(false);
      setTitle("");
      setText("");
      setSendNote(!sendNote);
    });
  };

  return (
    <div className="notesContainer">
      <div className="addNote">
        {addNoteMenu ? (
          <div className="noteInputs">
            <input
              type="text"
              placeholder="Title:"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="inputNote titleNote"
            />
            <input
              type="text"
              placeholder="Text:"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="inputNote textNote"
            />
            <div className="buttonsNote">
              <img
                className="del"
                onClick={() => {
                  setAddNoteMenu(false);
                  setTitle("");
                  setText("");
                }}
                src={cancel}
                alt="x"
              />
              <img
                className="ok"
                src={ok}
                onClick={() => addNote(title, text)}
                alt="ok"
              />
            </div>
          </div>
        ) : (
          <img
            className="addNoteImg"
            src={add}
            alt="add"
            onClick={() => setAddNoteMenu(true)}
          />
        )}
      </div>
      {notes.map((note, index) => (
        <Note
          title={note.title}
          text={note.text}
          key={index}
          id={note._id}
          check={note.check}
        />
      ))}
    </div>
  );
};
export default Notes;
