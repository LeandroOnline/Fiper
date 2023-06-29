import { useEffect, useState } from "react";
import "./Search.css";
import useGlobalStore from "../store/Store";

const Search = () => {
  const [value, setValue] = useState("");
  const { inputs, setFiltered } = useGlobalStore();

  const filterValue = (value) => {
    if (value.length >= 1) {
      const filtered = inputs.filter(
        (element) =>
          element.detalle.toLowerCase().includes(value.toLowerCase()) ||
          element.tipo.toLowerCase().includes(value.toLowerCase()) ||
          element.date.toLowerCase().includes(value.toLowerCase())
      );
      setFiltered(filtered);
    } else {
      setFiltered(false);
    }
  };

  useEffect(() => {
    filterValue(value);
  }, [value]);

  return (
    <input
      className="SearchInput"
      value={value}
      onChange={(e) => {
        setValue(e.target.value);
      }}
      type="text"
      placeholder="Buscar"
    />
  );
};
export default Search;
