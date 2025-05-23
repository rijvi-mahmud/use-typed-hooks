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

The `useBoolean` hook provides a simple way to manage a boolean state with toggle functionality and additional utility methods.

### Usage

```tsx
const [value, { toggle, setTrue, setFalse, reset, getValue }] =
  useBoolean(false);

// Example usage
toggle(); // Toggles the value between true and false
setTrue(); // Sets the value to true
setFalse(); // Sets the value to false
reset(); // Resets the value to the initial state
const currentValue = getValue(); // Retrieves the current boolean value
```

### Parameters

- `initialValue` (`boolean`): The initial value of the boolean state.

### Returns

- `[boolean, { toggle: () => void; setTrue: () => void; setFalse: () => void; reset: () => void; getValue: () => boolean; setValue: (value: boolean) => void }]`: A tuple containing the current boolean value and an object with methods to toggle, set true, set false, reset, get the current value, or set a specific value.

### Notes

- `reset` resets the state to its initial value.
- `getValue` retrieves the current state value.

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

---

## [useSessionStorage](src/hooks/use-session-storage.ts)

The `useSessionStorage` hook manages a value in the browser's `sessionStorage` with optional serialization and deserialization. It provides a way to persist state across page reloads within the same session.

### Usage

```tsx
const [value, setValue, removeValue] = useSessionStorage("key", "defaultValue");

// Example usage
setValue("newValue"); // Updates the value in sessionStorage
removeValue(); // Removes the value from sessionStorage
```

### Parameters

- `key` (`string`): The key to store the value under in `sessionStorage`.
- `initialValue` (`T | (() => T)`): The initial value or a function to compute it.
- `options` (`UseSessionStorageOptions<T>`): Optional configuration for serialization, deserialization, and initialization.

### Returns

- `[T, Dispatch<SetStateAction<T>>, () => void]`: A tuple containing the stored value, a setter function, and a remover function.

### Notes

- If the `initialValue` is not provided, the hook will attempt to retrieve the value from `sessionStorage` if it already exists. If no value exists in `sessionStorage`, the returned value will be `undefined`.
- The `options` parameter allows customization of serialization and deserialization logic.

### Example

```tsx
// Assuming "key" already exists in sessionStorage with the value "storedValue"
const [value, setValue, removeValue] = useSessionStorage("key");

console.log(value); // Outputs: "storedValue"

// If "key" does not exist in sessionStorage
const [newValue] = useSessionStorage("newKey");

console.log(newValue); // Outputs: undefined
```

---

## [usePrevious](src/hooks/usePrevious.ts)

The `usePrevious` hook retrieves the previous value of a state or prop. It is useful for comparing the current and previous values in a React component.

### Usage

```tsx
const [count, setCount] = useState(0);
const prevCount = usePrevious(count);

useEffect(() => {
  console.log("Current count:", count);
  console.log("Previous count:", prevCount);
}, [count]);
```

### Parameters

- `value` (`T`): The current value to track.

### Returns

- `T | undefined`: The previous value of the tracked state or prop.

### Notes

- The initial previous value is `undefined`.
- This hook is particularly useful for detecting changes in props or state.

---

## [useWindowResize](src/hooks/use-window-resize.ts)

The `useWindowResize` hook provides the current width and height of the browser window. It updates the values whenever the window is resized, with a debounce mechanism to optimize performance.

### Usage

```tsx
import { useWindowResize } from "./hooks/use-window-resize";

const Component = () => {
  const { width, height } = useWindowResize();

  return (
    <div>
      <p>Width: {width}</p>
      <p>Height: {height}</p>
    </div>
  );
};
```

### Parameters

This hook does not take any parameters.

### Returns

- `{ width: number | undefined, height: number | undefined }`: An object containing the current width and height of the window.

### Notes

- The hook initializes with `undefined` for both `width` and `height` if running on the server.
- It uses a debounce mechanism (default delay: 200ms) to reduce the frequency of updates during rapid resize events.
- Automatically cleans up the event listener when the component unmounts.

---

## [useEventListener](src/hooks/use-event-listener.ts)

The `useEventListener` hook adds an event listener to a specified element and ensures proper cleanup when the component unmounts or dependencies change.

### Usage

```tsx
// Example 1: Add a click event listener to a specific element
useEventListener(
  "click",
  (event) => console.log(event),
  document.getElementById("myElement")
);

// Example 2: Add a resize event listener to the window
useEventListener("resize", () => console.log("Window resized"));

// Example 3: Add a keydown event listener to the document
useEventListener(
  "keydown",
  (event) => console.log(`Key pressed: ${event.key}`),
  document
);
```

### Parameters

- `eventName` (`string`): The name of the event to listen for.
- `handler` (`EventListener`): The event handler function.
- `element` (`Window | Document | HTMLElement | null`): The target element to attach the event listener to. Defaults to `window` if not provided.

### Returns

- `void`: This hook does not return anything.

### Notes

- Automatically cleans up the event listener when the component unmounts or dependencies change.
- If no `element` is provided, the event listener is attached to the `window` object.
