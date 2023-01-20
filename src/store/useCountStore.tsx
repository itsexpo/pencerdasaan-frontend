import { createSelectorHooks } from "auto-zustand-selectors-hook";
import create from "zustand";

type CountStoreType = {
  count: number;
  increaseCount: () => void;
  decreaseCount: () => void;
};

const createCountStore = () => {
    return create<CountStoreType>((set) => ({
        count: 0,
        increaseCount: () => set((state) => ({ count: state.count + 1 })),
        decreaseCount: () => set((state) => ({ count: state.count - 1 })),
    }));
}

const createCountSelectors = (useCountStore) => {
    return createSelectorHooks(useCountStore);
}

const useCountStore = createCountStore();
const useCountSelectors = createCountSelectors(useCountStore);

export default useCountSelectors;
