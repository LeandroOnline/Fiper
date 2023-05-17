import { create } from "zustand";
import Cookies from "js-cookie";
import axiosGetAllInputs from "../api/axiosGetAllInputs";
// import { persist } from "zustand/middleware";

const useGlobalStore = create(
  // persist(
  (set, get) => ({
    reset: false,
    login: Cookies.get("user"),
    inputs: [],
    profits: [],
    losses: [],
    netPerMonth: [],
    filtered: false,
    setFiltered: (values) => set({ filtered: values }),
    setNetPerMonth: (net) => set({ netPerMonth: net }),
    setProfitsAndLosses: (profit, loss) =>
      set({ profits: profit, losses: loss }),
    setReset: () => set({ reset: !get().reset }),
    setLogged: () => set({ login: false }),
    setLogin: () => set({ login: Cookies.get("user") }),
    storeGetAllInputs: async () =>
      await axiosGetAllInputs().then((data) => set({ inputs: data })),
  })
  //   ,
  //   {
  //     name: "myFipe",
  //     storage: localStorage,
  //   }
  // )
);

console.log(Cookies.get("user"));
export default useGlobalStore;
