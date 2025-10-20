import { useEffect } from "react";
import Todo from "./todo/Todo";
import { useState } from "react";

const Todos = () => {
  const [todos, setTodos] = useState([]);

  const API_URI = import.meta.env.VITE_API_URI;

  useEffect(() => {
    const getTodos = async () => {
      const res = await fetch(`${API_URI}/todos`);

      const data = await res.json();
      setTodos(data);
    };
    getTodos();
  }, []);

  const onClickDelete = async (id) => {
    try {
      const response = await fetch(`${API_URI}/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      // console.log(id);
      if (response.ok) {
        //   setShowPopup(true); // show popup
        console.log("item deleted");

        //this will filter and remove the deleted todo for client side
        setTodos(() => todos.filter((todo) => todo._id != id));
        //   // hide popup after 2 seconds
        //   setTimeout(() => setShowPopup(false), 2000);
      }
    } catch (err) {
      console.log(err);
    }
  };

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
              onClickDelete={onClickDelete}
            />
          );
        })}
    </>
  );
};

export default Todos;
