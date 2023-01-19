import { createSelectorHooks } from "auto-zustand-selectors-hook";
import create from "zustand";

type CountStoreType = {
  count: number;
  increaseCount: () => void;
  decreaseCount: () => void;
};

const useCountStoreBase = create<CountStoreType>((set) => ({
  count: 0,
  increaseCount: () => set((state) => ({ count: state.count + 1 })),
  decreaseCount: () => set((state) => ({ count: state.count - 1 })),
}));

const useCountStore = createSelectorHooks(useCountStoreBase);

export default useCountStore;
