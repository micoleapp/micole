import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  decrementOne,
  incrementOne,
  incrementByAmountNumber,
  incrementAsync,
} from "./redux/actions";

function App() {
  const { value } = useSelector((state) => state.counter);
  const dispatch = useDispatch();
  const [incrementAmount, setIncrementAmount] = useState("2");

  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-center text-2xl">Esto es un ejemplo de redux</h1>
      <div className="flex gap-5 items-center justify-center">
        <button
          className="border px-2 shadow-md rounded-md"
          aria-label="Increment value"
          onClick={()=>dispatch(incrementOne())}
        >
          +
        </button>
        <span>{value}</span>
        <button
          className="border px-2 shadow-md rounded-md"
          aria-label="Decrement value"
          onClick={()=>dispatch(decrementOne())}
        >
          -
        </button>
      </div>
      <div className="flex gap-5 items-center justify-center">
        <input
          className="bg-gray-200 text-center w-5 rounded-md"
          aria-label="Set increment amount"
          value={incrementAmount}
          onChange={(e) => setIncrementAmount(e.target.value)}
        />
        <button
          className="border px-2 shadow-md rounded-md"
          onClick={() =>
            dispatch(incrementByAmountNumber(Number(incrementAmount) || 0))
          }
        >
          Add Amount
        </button>
        <button
          className="border px-2 shadow-md rounded-md"
          onClick={() => dispatch(incrementAsync(Number(incrementAmount) || 0))}
        >
          Add Async
        </button>
      </div>
    </div>
  );
}

export default App;
