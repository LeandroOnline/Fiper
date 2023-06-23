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
import { Gauge } from "@ant-design/plots";

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

  const config = {
    percent: 0.75,
    range: {
      color: "l(0) 0:#B8E1FF 1:#3D76DD",
    },
    startAngle: Math.PI,
    endAngle: 2 * Math.PI,
    indicator: null,
    statistic: {
      title: {
        offsetY: -36,
        style: {
          fontSize: "40px",
          color: "#4B535E",
        },
        formatter: () =>
          ((checksCount(notes).count / checksCount(notes).total) * 100).toFixed(
            0
          ) + "%",
      },
      content: {
        style: {
          fontSize: "20px",
          lineHeight: "44px",
          color: "#4B535E",
        },
        formatter: () => "Checkeadas",
      },
    },
  };

  return (
    <>
      <div className="notesContainer" id="notes">
        <div className="addNoteAndGraph">
          <Popup config={{ popupConfig, setPopupConfig }} />
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

          <Gauge {...config} className="gauge"/>
        </div>

        <div className="diviteNotesContainer"></div>

        <div className="notesGridContainer">
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
      </div>
    </>
  );
};
export default Notes;
