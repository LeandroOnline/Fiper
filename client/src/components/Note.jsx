import "./Note.css";
import del from "../assets/eliminar.png";
const Note = () => {
  return (
    <div className="noteContainer">
        <button className="deleteNote"><img className="deleteImg" src={del} alt="" /></button>
        <h1 className="noteTitle">Title</h1>
        <p className="noteText">Text</p>
    </div>
  )
}
export default Note