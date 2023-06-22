import Note from "./Note";
import "./Notes.css";
import add from "../assets/agregar.png";
import useGlobalStore from "../store/Store";
import { useEffect, useState } from "react";
import cancel from "../assets/cancelar.png";
import ok from "../assets/correcto.png";
import axiosAddNote from "../api/axiosAddNote";
import useSanitize from "../hooks/useSanitize";
import useErrorHandler from "../hooks/useErrorHandler";
import Popup from "./Popup";

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
  const [popupConfig, setPopupConfig] = useState({ toConfirm: true });

  useEffect(() => {
    storeGetNotes();
  }, [sendNote, noteDeletedOrUpdate]);

  const addNote = async (title, text) => {
    await axiosAddNote(title, text)
      .then(() => {
        setAddNoteMenu(false);
        setTitle("");
        setText("");
        setSendNote(!sendNote);
        setPopupConfig({
          type: "ok",
          text: "Nota agregada",
          activate: true,
          fast: true,
        });
      })
      .catch((err) => setPopupConfig(useErrorHandler(err)));
  };

  const checksCount = (notes) => {
    let count = 0;
    let total = 0;
    notes.map((note) => {
      total += 1;
      note.check ? (count += 1) : null;
    });
    return { count, total };
  };

  return (
    <>
      <div className="notesContainer" id="notes">
        <Popup config={{ popupConfig, setPopupConfig }} />
        <h1>Cantidad de notas checkeadas: {checksCount(notes).count}</h1>
        <progress
          className="progressNotes"
          max="100"
          value={
            notes.length > 0
              ? (checksCount(notes).count / checksCount(notes).total) * 100
              : 0
          }
        />
        <div
          className="addNote"
          onClick={() => (addNoteMenu ? null : setAddNoteMenu(true))}
        >
          {addNoteMenu ? (
            <div className="noteInputs">
              <input
                type="text"
                placeholder="Title:"
                value={title}
                onChange={(e) => setTitle(useSanitize(e.target.value))}
                className="titleNote"
              />
              <textarea
                type="text"
                placeholder="Text:"
                value={text}
                onChange={(e) => setText(useSanitize(e.target.value))}
                className="inputNote"
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
    </>
  );
};
export default Notes;
