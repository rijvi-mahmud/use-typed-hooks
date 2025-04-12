import { useState } from "react";

type BooleanHookReturnProps = {
  value: boolean;
  setValue: (value: boolean) => void;
  toggle: () => void;
  setTrue: () => void;
  setFalse: () => void;
  reset: () => void;
};

/**
 * A custom hook that manages a boolean state.
 * @param initialValue - The initial value of the boolean state.
 * @returns An object containing the current value, toggle function, setTrue function, setFalse function, and reset function.
 *
 * @example
 * const { value, toggle, setTrue, setFalse, reset } = useBoolean(false);
 */

export const useBoolean = (initialValue: boolean): BooleanHookReturnProps => {
  const [value, setValue] = useState(initialValue);

  const toggle = () => setValue((prev) => !prev);
  const setTrue = () => setValue(true);
  const setFalse = () => setValue(false);

  const reset = () => setValue(initialValue);

  return { value, toggle, setTrue, setFalse, setValue, reset };
};
