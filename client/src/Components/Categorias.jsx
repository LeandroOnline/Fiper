
import "./Categorias.css";

const Categorias = () => {
  return (
    <>
      <select id="entrada" name="tipo">
        <option value="Ingresos">Ingresos</option>
        <option value="Egresos">Egresos</option>
      </select>
      <input placeholder="$" type="number" name="input" autoFocus />
      <input placeholder="Detalle" name="detalle" />
    </>
  );
};
export default Categorias;
