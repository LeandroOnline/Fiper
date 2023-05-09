import create from "zustand";

export const useGlobalStore = create((set, get) => ({
  reset: false,
  logged: false,
  inputs: [],
  ingresos: 0,
  egresos: 0,
  neto: 0,
  setLogged: () => set({ logged: !get().logged }),
  setReset: () => set({ reset: !get().reset }),
}));
