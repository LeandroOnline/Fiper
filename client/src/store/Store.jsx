import { create } from "zustand";
import axiosGetAllInputs from "../api/axiosGetAllInputs";
import axiosGetNotes from "../api/axiosGetNotes";

import { persist, createJSONStorage } from "zustand/middleware";
import apiTest from "../api/apiTest";

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
      emailStore: "",
      verifyMessage: false,
      apiTest: "",
      notes: [{ title: "titulo", text: "texto" }],
      noteDeleted: false,
      setNoteDeleted: () => set({ noteDeleted: !get().noteDeleted }),
      storeGetNotes: async () =>
        await axiosGetNotes().then((data) => set({ notes: data })),
      setApiTest: async () => set({ apiTest: await apiTest() }),
      setVerifyMessage: () => set({ verifyMessage: true }),
      setVerifyMessageDone: () => set({ verifyMessage: false }),
      setEmailStore: (email) => set({ emailStore: email }),
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
