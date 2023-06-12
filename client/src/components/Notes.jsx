import Note from "./Note"
import "./Notes.css"
import add from "../assets/agregar.png"
const Notes = () => {
  return (
    <div className="notesContainer">
        <div className="addNote"><img className="addNoteImg" src={add} alt="add" /></div>
        <Note/>

    </div>
  )
}
export default Notes