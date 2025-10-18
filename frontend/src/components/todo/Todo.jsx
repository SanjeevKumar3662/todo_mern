// import { useState } from "react";
import "./todo.css";
const Todo = ({ id, title }) => {
  // const [showPopup, setShowPopup] = useState(false);

  const onClickDelete = async () => {
    try {
      const response = await fetch(`http://localhost:3000/todos/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      console.log(id);
      if (response.ok) {
        //   setShowPopup(true); // show popup
        console.log("item deleted");
        //   // hide popup after 2 seconds
        //   setTimeout(() => setShowPopup(false), 2000);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="todo">
      <span>{title}</span>
      <div>
        <button className="">More</button>
        <button onClick={onClickDelete} className="delete">
          Delete
        </button>
      </div>
    </div>
  );
};

export default Todo;
