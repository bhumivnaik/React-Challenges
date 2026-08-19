import { useAppDispatch, useAppSelector } from "../store/hooks"
import { increment, decrement } from "../store/slices/counterSlice";
/** Stub: Complete Challenge 03 (Reading and Dispatching) per README. */
export default function CounterView() {
  const count = useAppSelector((state) => state.counter.count);
  const dispatch = useAppDispatch();

  return (
    <>
      <div data-testid="counter-view">
        <p data-testid="counter-value">{count}</p>
        <button data-testid="increment-btn" onClick={() => dispatch(increment())}>+</button >
        <button data-testid="decrement-btn" onClick={() => dispatch(decrement())}>-</button >
      </div>
    </>
  );
}
