import "./Note.css";
import del from "../assets/eliminar.png";
import modify from "../assets/modificar.png";
import axiosDeleteNote from "../api/axiosDeleteNote";
import useGlobalStore from "../store/Store";
import { useState } from "react";
import axiosUpdateNote from "../api/axiosUpdateNote";
import ok from "../assets/correcto.png";
import cancel from "../assets/cancelar.png";
import axiosCheckNote from "../api/axiosCheckNote";
import done from "../assets/hecho.png";
import useErrorHandler from "../hooks/useErrorHandler"

const Note = ({ title, text, id, check }) => {
  const setNoteDeletedOrUpdate = useGlobalStore(
    (state) => state.setNoteDeletedOrUpdate
  );
  const [updateMenu, setUpdateMenu] = useState(false);
  const [titleUpdate, setTitleUpdate] = useState(title);
  const [textUpdate, setTextUpdate] = useState(text);

  const deleteNote = async (id) => {
    await axiosDeleteNote(id).then((e) => {
      setNoteDeletedOrUpdate();
    }).catch((err) => setPopupConfig(useErrorHandler(err)));;
  };

  const updateNote = async (id, title, text) => {
    await axiosUpdateNote(id, title, text).then((e) => {
      setUpdateMenu(false);
      setNoteDeletedOrUpdate();
    }).catch((err) => setPopupConfig(useErrorHandler(err)));;
  };

  const checkNote = async (id) => {
    await axiosCheckNote(id).then((e) => {
      setNoteDeletedOrUpdate();
    }).catch((err) => setPopupConfig(useErrorHandler(err)));;
  };

  return (
    <>
      {updateMenu ? (
        <div className="noteContainer">
          <input
            type="text"
            placeholder="Title:"
            value={titleUpdate}
            onChange={(e) => setTitleUpdate(e.target.value)}
            className="inputTitleUpdate"
          />
          <textarea
            type="text"
            placeholder="Text:"
            value={textUpdate}
            onChange={(e) => setTextUpdate(e.target.value)}
            className="inputTextUpdate"
          />
          <div className="buttonsSavedNote">
            <img
              className="deleteImg"
              onClick={() => {
                setUpdateMenu(false);
              }}
              src={cancel}
              alt="x"
            />
            <img
              className="modifyImg"
              src={ok}
              onClick={() => updateNote(id, titleUpdate, textUpdate)}
              alt="ok"
            />
          </div>
        </div>
      ) : (
        <div className="noteContainer">
          <div
            className={
              check ? " checkNoteGreenBorder" : "checkNoteGray"
            }
            onClick={() => {
              checkNote(id);
            }}
          >
            <div className={check ? "checkNoteGreen" : "none"}>
              <img
                className={check ? "done" : "doneNone"}
                src={done}
                alt="check"
              />
            </div>
          </div>
          <div className="buttonsSavedNote">
            <img
              className="deleteImg"
              src={del}
              alt=""
              onClick={() => deleteNote(id)}
            />
            <img
              className="modifyImg"
              src={modify}
              alt=""
              onClick={() => setUpdateMenu(true)}
            />
          </div>
          <h1 className="noteTitle">{title}</h1>
          <p className="noteText">{text}</p>
        </div>
      )}
    </>
  );
};
export default Note;
