import create from "zustand";

export const useGlobalStore = create((set, get) => ({
  reset: false,
  logged: false,
  ingresos: 0,
  egresos: 0,
  neto: 0,
  setLogged: ()=>set({logged: !logged})
}));
