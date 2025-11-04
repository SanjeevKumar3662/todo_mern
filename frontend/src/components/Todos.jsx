import { useEffect } from "react";
import Todo from "./todo/Todo";
import { apiClient } from "../utils/apiClient";

const Todos = ({ todos, setTodos }) => {
  const API_URI = import.meta.env.VITE_API_URI;

  useEffect(() => {
    const getTodos = async () => {
      const res = await fetch(`${API_URI}/todos/all-todos`);

      const data = await res.json();
      setTodos(data);
    };
    getTodos();
  }, [API_URI, setTodos]);

  const onClickDelete = async (id) => {
    try {
      const response = await apiClient(`/todos/delete/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        console.log("Item deleted");
        setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id));
      } else {
        const data = await response.json();
        console.error("Failed to delete:", data.message);
      }
    } catch (err) {
      console.error("Error deleting todo:", err.message);
    }
  };

  // todos && console.log(todos);
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
              onClickDelete={onClickDelete}
            />
          );
        })}
    </>
  );
};

export default Todos;
