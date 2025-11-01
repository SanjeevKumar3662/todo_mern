import { useState } from "react";
import "./App.css";
import Form from "./components/Form";
import Todos from "./components/Todos";
function App() {
  // const [count, setCount] = useState(0)
  const [todos, setTodos] = useState([]);

  return (
    <>
      <div className="container">
        <div className="main">
          <h1>This is a "MERN" Todo List</h1>
          <Form todos={todos} setTodos={setTodos} />
          <Todos todos={todos} setTodos={setTodos} />
        </div>
      </div>
    </>
  );
}

export default App;
