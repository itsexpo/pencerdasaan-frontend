import { createSelectorHooks } from "auto-zustand-selectors-hook";
import create from "zustand";

type CountType = {
  count: number;
  increment: () => void;
  decrement: () => void;
};

const useCountBase = create<CountType>()((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
}));

export const useCount = createSelectorHooks(useCountBase);
