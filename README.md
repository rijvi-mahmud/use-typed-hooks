# Hooks Documentation

## useDefault

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

## useDebounce

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
