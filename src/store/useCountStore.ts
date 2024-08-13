import { create } from "../state-nut";
import { logMiddleware } from "../middleware/logMiddleware";

interface CountState {
  count: number;
  increase: (by?: number) => void;
  decrease: (by?: number) => void;
  reset: () => void;
  setCount: (count: number) => void;
}

const useCountStore = create(logMiddleware<CountState>(
  (set) => ({
    count: 0,
    increase: (by = 1) => set((state) => ({count: state.count + by})),
    decrease: (by = 1) => set((state) => ({count: state.count - by})),
    reset: () => set({count: 0}),
    setCount: (count: number) => set({count}),
  })
));

export default useCountStore;
