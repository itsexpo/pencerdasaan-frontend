import { useCount } from "@/store/pencerdasan/useCount";

export default function CounterPage() {
  const count = useCount.useCount();
  const increment = useCount.useIncrement();
  const decrement = useCount.useDecrement();

  return (
    <div className="flex flex-col justify-start items-center w-full">
      <div className="flex flex-col justify-center items-center w-24 p-2 mt-2">
        <div className="flex flex-row justify-center items-center border-2 border-black w-full p-2">
          <h1>{count}</h1>
        </div>
        <div className="flex flex-row justify-around items-center rounded-lg border-2 border-black w-full mt-2">
          <button onClick={decrement}>-</button>
          <button onClick={increment}>+</button>
        </div>
      </div>
    </div>
  );
}
