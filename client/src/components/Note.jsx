import "./Note.css";
import del from "../assets/eliminar.png";
import modify from "../assets/modificar.png";
import axiosDeleteNote from "../api/axiosDeleteNote";
import useGlobalStore from "../store/Store";

const Note = ({ title, text, id }) => {
  const setNoteDeleted = useGlobalStore((state) => state.setNoteDeleted);

  const deleteNote = async (id) => {
    await axiosDeleteNote(id).then((e) => {
      setNoteDeleted();
    });
  };

  const updateNote = async (id) => {};

  return (
    <div className="noteContainer">
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
          onClick={() => updateNote(id)}
        />
      </div>
      <h1 className="noteTitle">{title}</h1>
      <p className="noteText">{text}</p>
    </div>
  );
};
export default Note;
