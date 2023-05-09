import {create} from "zustand";

const useGlobalStore = create((set, get) => ({
  reset: false,
  logged: false,
  inputs: [],
  ingresos: 0,
  egresos: 0,
  neto: 0,
  setLogged: () => set({ logged: !get().logged }),
  setReset: () => set({ reset: !get().reset }),
  setIngresos: (value) => set({ ingresos: value}),
}));

export default useGlobalStore;