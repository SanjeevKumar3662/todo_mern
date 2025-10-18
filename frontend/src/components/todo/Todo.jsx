import "./todo.css";
import { useState } from "react";

const Todo = ({ id, title, onClickDelete, description }) => {
  const [showMore, setShowMore] = useState(false);

  const onClickShowMore = () => {
    setShowMore(() => !showMore);
  };
  return (
    <div className="todo">
      <div className="title">
        <span>{title}</span>
        <div>
          <button onClick={onClickShowMore} className="">
            More
          </button>
          <button onClick={() => onClickDelete(id)} className="delete">
            Delete
          </button>
        </div>
      </div>

      {showMore && <pre className="description">{description}</pre>}
    </div>
  );
};

export default Todo;
