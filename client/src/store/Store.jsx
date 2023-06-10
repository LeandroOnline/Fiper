import { create } from "zustand";
import axiosGetAllInputs from "../api/axiosGetAllInputs";

import { persist, createJSONStorage } from "zustand/middleware";

const useGlobalStore = create(
  persist(
    (set, get) => ({
      reset: false,
      login: sessionStorage.getItem("user"),
      inputs: [],
      profits: [],
      losses: [],
      netPerMonth: [],
      filtered: false,
      checkVerify: false,
      setVerifyFalse: () => set({ checkVerify: false }),
      setVerify: () => set({ checkVerify: true }),
      setFiltered: (values) => set({ filtered: values }),
      setNetPerMonth: (net) => set({ netPerMonth: net }),
      setProfitsAndLosses: (profit, loss) =>
        set({ profits: profit, losses: loss }),
      setReset: () => set({ reset: !get().reset }),
      setLogin: (res) => set({ login: res }),
      storeGetAllInputs: async () =>
        await axiosGetAllInputs().then((data) => set({ inputs: data })),
    }),
    {
      name: "myFipe",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default useGlobalStore;
