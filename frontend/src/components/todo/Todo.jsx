// import { useState } from "react";
import "./todo.css";
const Todo = ({ id, title, onClickDelete }) => {
  // const [showPopup, setShowPopup] = useState(false);

  return (
    <div className="todo">
      <span>{title}</span>
      <div>
        <button className="">More</button>
        <button onClick={() => onClickDelete(id)} className="delete">
          Delete
        </button>
      </div>
    </div>
  );
};

export default Todo;
