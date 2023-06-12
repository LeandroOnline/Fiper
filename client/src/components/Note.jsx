import "./Note.css";
import del from "../assets/eliminar.png";
import modify from "../assets/modificar.png";
const Note = ({ title, text }) => {
  return (
    <div className="noteContainer">
      <div className="buttonsSavedNote">
        <img className="deleteImg" src={del} alt="" />
        <img className="modifyImg" src={modify} alt="" />
      </div>
      <h1 className="noteTitle">{title}</h1>
      <p className="noteText">{text}</p>
    </div>
  );
};
export default Note;
