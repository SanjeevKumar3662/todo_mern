import "./todo.css";

const Todo = ({ title }) => {
  return (
    <div className="todo">
      <span>{title}</span>
    </div>
  );
};

export default Todo;
