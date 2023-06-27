import { create } from "zustand";
import axiosGetAllInputs from "../api/axiosGetAllInputs";
import axiosGetNotes from "../api/axiosGetNotes";
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
      emailStore: "",
      verifyMessage: false,
      notes: [{ title: "titulo", text: "texto" }],
      noteDeletedOrUpdate: false,
      sound: true,
      nickname: false,
      dataArea:[],
      dataColumn:[],
      setDataArea: (e)=> set({dataArea: e}),
      setDataColumn: (e)=> set({dataColumn: e}),
      setNickname: (e) => set({ nickname: e }),
      setSound: () => set({ sound: !get().sound }),
      setNoteDeletedOrUpdate: () =>
        set({ noteDeletedOrUpdate: !get().noteDeletedOrUpdate }),
      storeGetNotes: async () =>
        await axiosGetNotes().then((data) => set({ notes: data })),
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
