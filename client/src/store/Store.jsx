import { create } from "zustand";
import Cookies from "js-cookie";

const useGlobalStore = create((set, get) => ({
  reset: false,
  login: Cookies.get("user"),
  logged: true,
  inputs: [],
  ingresos: 0,
  egresos: 0,
  neto: 0,
  setLogged: () => set({ logged: !get().logged }),
  setReset: () => set({ reset: !get().reset }),
  setIngresos: (value) => set({ ingresos: value }),
  setInputs: (inputs)=> set({ inputs : inputs }),
}));

console.log("Store");

export default useGlobalStore;
