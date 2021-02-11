import { createStore, applyMiddleware } from "redux";
import { getSagaMiddleware } from "./saga-core";
import { rootSaga } from "./sagas";

// reducers

const reducer = (state, { type }) => {
  switch (type) {
    case "INCREMENT":
      return state + 1;
    case "DECREMENT":
      return state - 1;
    case "RESET":
      return 0;
    default:
      break;
  }

  return state;
};

// actions

export const increment = () => ({ type: "INCREMENT" });
export const decrement = () => ({ type: "DECREMENT" });
export const reset = () => ({ type: "RESET" });
export const onDataLoadStart = () => ({ type: "ON_DATA_LOAD_START" });
export const onDataLoadEnd = () => ({ type: "ON_DATA_LOAD_END" });

// store

const sagaMiddleware = getSagaMiddleware();

export default createStore(
  reducer,
  0,
  applyMiddleware(loggingMiddleware, sagaMiddleware)
);

sagaMiddleware.run(rootSaga);

// middleware

function loggingMiddleware() {
  return (next) => (action) => {
    console.log(action);
    return next(action);
  };
}
