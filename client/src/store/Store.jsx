import { create } from "zustand";
import axiosGetAllInputs from "../api/axiosGetAllInputs";
// import { persist } from "zustand/middleware";

const useGlobalStore = create(
  // persist(
  (set, get) => ({
    reset: false,
    login: sessionStorage.getItem("user"),
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
    setLogin: (res) => set({ login: res }),
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

export default useGlobalStore;
