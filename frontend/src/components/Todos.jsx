import { useEffect } from "react";
import Todo from "./todo/Todo";
import { useState } from "react";

const Todos = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const getTodos = async () => {
      const res = await fetch("http://localhost:3000/todos");
      // http://localhost:3000/
      const data = await res.json();
      setTodos(data);
    };
    getTodos();
  }, []);

  todos && console.log(todos);
  return (
    <>
      <h1>All Todos Here</h1>

      {/* <Todo title={"anki"} />
       */}
      {todos &&
        todos.map((obj) => {
          return (
            <Todo
              key={obj._id}
              id={obj._id}
              title={obj.title}
              description={obj.description}
            />
          );
        })}
    </>
  );
};

export default Todos;
