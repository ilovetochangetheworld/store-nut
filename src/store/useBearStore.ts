// import {create} from "zustand";
// import {immer} from "zustand/middleware/immer";
import {create} from "../zustand-nut";
import {immer} from "../zustand-nut/middleware/immer";
import { logMiddleware } from "../middleware/logMiddleware";

interface BearState {
  bears: number; // 状态值
  count: number;

  increase: (by?: number) => void;
  decrease: (by?: number) => void;
  reset: () => void;

  increaseCount: () => void;
}

const useBearStore = create(
  logMiddleware(immer<BearState>((set) => ({
    bears: 0,
    count: 100,
    increase: (by = 1) => set((state) => ({bears: state.bears + by})),
    decrease: (by = 1) =>
      set((draft) => {
        draft.bears -= by;
      }),
    reset: () => set({bears: 0}),

    increaseCount: () => set((state) => ({count: state.count + 1})),
  }))
));

export default useBearStore;
