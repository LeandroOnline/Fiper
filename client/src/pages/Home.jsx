import "./Home.css";
const Home = () => {
  return (
    <div className="homecontainer">
      <form action="" className="homeform">
        <p>Fecha Automatica</p>
        <select id="tipo" name="tipo">
          <option value="">Tipo:</option>
          <option value="edicion">Edicion</option>
          <option value="fotografo">Fotografo</option>
          <option value="web">Web</option>
          <option value="otro">Otro</option>
        </select>
        <input placeholder="Monto $" />
        <input placeholder="Link" />
        <button type="submit">Cargar</button>
      </form>
    </div>
  );
};
export default Home;
