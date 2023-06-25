import Note from "./Note";
import "./Notes.css";
import useGlobalStore from "../store/Store";
import { useEffect, useState } from "react";
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

  let porcent = (
    (checksCount(notes).count / checksCount(notes).total) *
    100
  ).toFixed(0);

  const config = {
    percent: porcent / 100,
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
          fontSize: "24px",
          color: "#4B535E",
        },
        formatter: () => (porcent !== "NaN" ? `${porcent} %` : 0 + "%"),
      },
      content: {
        style: {
          fontSize: "14px",
          lineHeight: "14px",
          color: "#4B535E",
        },
        formatter: () => "Checkeadas",
      },
    },
  };

  const reversedNotes = [...notes].reverse();

  return (
    <>
      <div className="notesContainer" id="notes">
        <div className="addNoteAndGraph">
          <Popup config={{ popupConfig, setPopupConfig }} />

          <input
            type="text"
            placeholder="Titulo"
            value={title}
            onChange={(e) => setTitle(useSanitize(e.target.value))}
            className="titleNote"
          />
          <textarea
            type="text"
            placeholder="Texto"
            value={text}
            onChange={(e) => setText(useSanitize(e.target.value))}
            className="inputNote"
          />
          <button className="clearAll" onClick={() => addNote(title, text)}>
            Agregar
          </button>
          <Gauge {...config} className="gauge" />
        </div>

        <div className="notesGridContainer">
          {reversedNotes.map((note, index) => (
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
