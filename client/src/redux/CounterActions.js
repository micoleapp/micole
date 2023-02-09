import {
  increment, decrement, incrementByAmount
} from "./CounterSlice";

export const incrementOne = () => (dispatch) => {
  dispatch(increment())
}

export const decrementOne = () => (dispatch) => {
  dispatch(decrement())
}

export const incrementByAmountNumber = (number) => (dispatch) => {
  dispatch(incrementByAmount(number))
}

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const incrementAsync = (amount) => (dispatch) => {
  setTimeout(() => {
    dispatch(incrementByAmount(amount))
  }, 1000)
}