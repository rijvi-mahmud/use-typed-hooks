# Hooks Documentation

## [useDefault](src/hooks/use-default.ts)

The `useDefault` hook manages a stateful value with a default fallback. It ensures that when the state is set to `null` or `undefined`, it falls back to a predefined default value.

### Usage

```tsx
const initialUser = { name: "initial" };
const defaultUser = { name: "Jane Doe" };
const [user, setUser] = useDefault(initialUser, defaultUser);

// Example usage
setUser(null); // Resets to defaultUser
setUser({ name: "John Doe" }); // Updates to { name: "John Doe" }
```

### Parameters

- `initialValue` (`T`): The initial value of the state.
- `defaultValue` (`T`): The default value to fall back to when the state is `null` or `undefined`.

### Returns

- `[T, (newValue: Nullable<T>) => void]`: A tuple containing the current value and a setter function.

---

## [useDebounce](src/hooks/use-debounce.ts)

The `useDebounce` hook delays the update of a value until after a specified delay has passed since the last time it was updated. This is useful for scenarios like search input where you want to wait for the user to stop typing before making a request.

### Usage

```tsx
const debouncedValue = useDebounce(value, delay);

// Example usage
const [searchTerm, setSearchTerm] = useState("");
const debouncedSearchTerm = useDebounce(searchTerm, 500);

useEffect(() => {
  if (debouncedSearchTerm) {
    // Perform search
  }
}, [debouncedSearchTerm]);
```

### Parameters

- `value` (`T`): The value to debounce.
- `delay` (`number`): The delay in milliseconds.

### Returns

- `T`: The debounced value.

---

## [useLocalStorage](src/hooks/use-localStorage.ts)

The `useLocalStorage` hook manages a value in the browser's `localStorage` with optional serialization and deserialization. It provides a way to persist state across sessions.

### Usage

```tsx
const [value, setValue, removeValue] = useLocalStorage("key", "defaultValue");

// Example usage
setValue("newValue"); // Updates the value in localStorage
removeValue(); // Removes the value from localStorage
```

### Parameters

- `key` (`string`): The key to store the value under in `localStorage`.
- `initialValue` (`T | (() => T)`): The initial value or a function to compute it.
- `options` (`UseLocalStorageOptions<T>`): Optional configuration for serialization, deserialization, and initialization.

### Returns

- `[T, Dispatch<SetStateAction<T>>, () => void]`: A tuple containing the stored value, a setter function, and a remover function.

### Note

If the `initialValue` is not provided, the hook will attempt to retrieve the value from `localStorage` if it already exists. If no value exists in `localStorage`, the returned value will be `undefined`.

### Example

```tsx
// Assuming "key" already exists in localStorage with the value "storedValue"
const [value, setValue, removeValue] = useLocalStorage("key");

console.log(value); // Outputs: "storedValue"

// If "key" does not exist in localStorage
const [newValue] = useLocalStorage("newKey");

console.log(newValue); // Outputs: undefined
```

---

## [useIsomorphicEffect](src/hooks/use-isomorphic-effect.ts)

The `useIsomorphicEffect` hook is a safe version of `useEffect` that works seamlessly on both the client and server. It falls back to `useEffect` on the server to avoid warnings.

### Usage

```tsx
useIsomorphicEffect(() => {
  // Your effect logic here
}, [dependencies]);
```

### Parameters

- `effect` (`EffectCallback`): The effect function to run.
- `dependencies` (`DependencyList`): An array of dependencies for the effect.

### Returns

- `void`: This hook does not return anything.

---

## [useBoolean](src/hooks/use-boolean.ts)

The `useBoolean` hook provides a simple way to manage a boolean state with toggle functionality.

### Usage

```tsx
const [value, { toggle, setTrue, setFalse }] = useBoolean(false);

// Example usage
toggle(); // Toggles the value between true and false
setTrue(); // Sets the value to true
setFalse(); // Sets the value to false
```

### Parameters

- `initialValue` (`boolean`): The initial value of the boolean state.

### Returns

- `[boolean, { toggle: () => void; setTrue: () => void; setFalse: () => void }]`: A tuple containing the current boolean value and an object with methods to toggle, set true, or set false.

---

## [useClipboardCopy](src/hooks/use-clipboard-copy.ts)

The `useClipboardCopy` hook provides a function to copy text to the clipboard and keeps track of the copied value.

### Usage

```tsx
const [copiedText, copy] = useClipboardCopy();

// Example usage
copy("Hello, World!").then((success) => {
  if (success) {
    console.log("Copied successfully!");
  } else {
    console.log("Copy failed.");
  }
});
```

### Returns

- `[CopiedValue, CopyFunc]`: A tuple containing the copied value and the `copy` function.

### Notes

- `CopiedValue` is a string or `null`.
- `CopyFunc` is a function that takes a string and returns a promise resolving to a boolean indicating success or failure.

---

## [useInterval](src/hooks/use-interval.ts)

The `useInterval` hook sets up an interval and executes a callback function at the specified delay. It also provides a function to manually stop the interval.

### Parameters

- `callback` - The function to be executed at each interval.
- `delay` - The delay in milliseconds for the interval. If `null`, the interval is paused and cleared.

### Returns

- `{ stop: () => void }`: An object containing a `stop` function to manually stop the interval.

### Example

```typescript
import { useInterval } from "./hooks/use-interval";

function App() {
  const { stop } = useInterval(() => {
    console.log("This will run every second");
  }, 1000);

  return (
    <div>
      <button onClick={stop}>Stop Interval</button>
      Check the console for interval logs.
    </div>
  );
}

// To pause the interval:
useInterval(() => {
  console.log("This will not run");
}, null);

// To stop the interval manually:
const { stop } = useInterval(() => {
  console.log("This will run until stopped");
}, 1000);
stop();
```

### Notes

- The `callback` function is always up-to-date with the latest state or props due to the use of `useRef`.
- Setting `delay` to `null` will pause the interval.
- Use the `stop` function to manually clear the interval.
