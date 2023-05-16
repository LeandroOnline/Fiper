import { create } from "zustand";
import Cookies from "js-cookie";
import axiosGetAllInputs from "../api/axiosGetAllInputs";

// import { persist } from "zustand/middleware";
// const useGlobalStore = create(
//   persist(
//     (set, get) => ({
//       reset: false,
//       login: Cookies.get("user"),
//       logged: true,
//       inputs: [],
//       ingresos: 0,
//       egresos: 0,
//       neto: 0,
//       setLogged: () => set({ logged: !get().logged }),
//       setReset: () => set({ reset: !get().reset }),
//       setIngresos: (value) => set({ ingresos: value }),
//       setInputs: (inputs) => set({ inputs: inputs }),
//     }),
//     {
//       name: "myFipe",
//       getStorage: () => localStorage, // Configuración para utilizar localStorage como almacenamiento
//     }
//   )
// );
const useGlobalStore = create((set, get) => ({
  reset: false,
  login: Cookies.get("user"),
  inputs: [],
  profits: [],
  losses: [],
  netPerMonth: [],
  setNetPerMonth: (net) => set({ netPerMonth: net }),
  setReset: () => set({ reset: !get().reset }),
  setProfitsAndLosses: (profit, loss) => set({ profits: profit, losses: loss }),
  setLogged: () => set({ login: false }),
  setLogin: () => set({ login: Cookies.get("user") }),
  storeGetAllInputs: async () =>
    await axiosGetAllInputs().then((data) => set({ inputs: data })),
}));

export default useGlobalStore;
