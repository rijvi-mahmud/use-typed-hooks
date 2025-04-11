import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { useDefault } from "./hooks/use-default";

function App() {
  const initialUser = { name: "initial" };
  const defaultUser = { name: "Jane Doe" };
  const [count, setCount] = useState(0);
  const [user, setUser] = useDefault(initialUser, defaultUser);

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <div>
        <h2>User Info</h2>
        <p>Name: {user.name}</p>
        <button onClick={() => setUser(null)}>Update User</button>
        <button onClick={() => setUser({ name: "John Doe" })}>
          Reset User
        </button>
        <button onClick={() => setUser({ name: "Jane Doe" })}>
          Set Default User
        </button>
        <button onClick={() => setUser({ name: "Bob" })}>
          Set User to Bob
        </button>
      </div>
    </>
  );
}

export default App;
