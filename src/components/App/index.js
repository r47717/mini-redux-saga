import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "./index.module.css";
import { increment, decrement, reset } from "../../store";

function App() {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  return (
    <>
      {state}
      <button onClick={() => dispatch(increment())}>inc</button>
      <button onClick={() => dispatch(decrement())}>dec</button>
      <button onClick={() => dispatch(reset())}>reset</button>
    </>
  );
}

export default App;
