import useCountStore from "@/store/useCountStore";

export default function Zustand() {
  const count = useCountStore.useCount();
  const increaseCount = useCountStore.useIncreaseCount();
  const decreaseCount = useCountStore.useDecreaseCount();

  return (
    <div className="flex flex-col justify-center items-center h-screen gap-2">
      <h1 className="text-3xl">Zustand</h1>
      <div className="flex flex-row gap-2">
        <button
          className="border-2 text-3xl w-10 border-black rounded-md"
          onClick={decreaseCount}
        >
          -
        </button>
        <h2 className="border-2 w-16 border-black text-3xl text-center rounded-md">
          {count}
        </h2>
        <button
          className="border-2 text-3xl w-10 border-black rounded-md"
          onClick={increaseCount}
        >
          +
        </button>
      </div>
    </div>
  );
}
