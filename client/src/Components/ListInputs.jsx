import { useContext, useEffect, useState } from "react";
import axios from "axios";
import "./ListInputs.css";
import { context } from "../App";
import Categorias from "./Categorias";

const API = "http://localhost:3000/api";

const ListInputs = () => {
  const [inputs, setInputs] = useState([0]);
  const [modificar, setModificar] = useState(false);
  const [idElemento, setIdElemento] = useState("");
  // const navigate = useNavigate();

  let { reset, setReset } = useContext(context);

  const clearTrue = async () => {
    if (window.confirm("SEGURO queres eliminar todas las Entradas?"))
      if (window.confirm("Seguro?, no hay vuelta atras!"))
        await axios
          .delete(API + "/deleteall")
          .then(() => setReset(!reset))
          .catch((err) => {
            console.log(err);
            window.alert(
              "Error al borrar los datos del servidor, contacte al administrador"
            );
          });
  };

  const deleteItem = async (id) => {
    if (window.confirm("Eliminar Item?"))
      await axios
        .delete(API + "/delete/" + id, {
          withCredentials: true,
        })
        .then(() => setReset(!reset))
        .catch((err) => {
          console.log(err);
          window.alert(
            "Error al eliminar los datos del servidor, contacte al administrador"
          );
        });
  };

  const updateItem = async (e) => {
    e.preventDefault();
    await axios
      .put(API + "/update/" + idElemento, {
        tipo: e.target.tipo.value,
        input: e.target.input.value,
        detalle: e.target.detalle.value,
      })
      .then(() => {
        setReset(!reset);
        setModificar(false);
      })
      .catch((err) => {
        console.log(err);
        window.alert(
          "Error al actualizar los datos del servidor, contacte al administrador"
        );
      });
  };

  useEffect(() => {
    const get = async () =>
      await axios
        .get(API + "/getall", {
          withCredentials: true,
        })
        .then((data) => setInputs(data.data))
        .catch((err) => {
          console.log(err);
          window.alert(
            "Error al cargar los datos del servidor, contacte al administrador"
          );

        });
    get();
    // ver que cuando llegue una lista vacia no tire error, el error surge de eliminar el usuario e intentar cargar los datos del usuario eliminado
  }, [reset]);

  return (
    <div className="listcontainer">
      Entradas:
      {inputs.map((element, key) => (
        <div key={key} className="listElement">
          <button onClick={() => deleteItem(element._id)}>Eliminar</button>
          <button
            onClick={() => {
              setModificar(true);
              setIdElemento(element._id);
            }}
          >
            Modificar
          </button>
          <p>{element.tipo}</p>
          <p>{element.input}</p>
          {element.detalle !== "" ? <p>{element.detalle}</p> : null}
        </div>
      ))}
      {modificar ? (
        <>
          <form onSubmit={(e) => updateItem(e)} className="homeform">
            <Categorias />
            <div>
              <button type="submit">Aplicar</button>
              <button onClick={() => setModificar(false)}>Cancelar</button>
            </div>
          </form>
        </>
      ) : null}
      <button onClick={() => clearTrue()}>Limpiar todo</button>
    </div>
  );
};
export default ListInputs;
