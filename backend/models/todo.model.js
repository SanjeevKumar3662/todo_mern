import mongoose from "mongoose";

const todo_schema = mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Todo = mongoose.model("Todo", todo_schema);

export default Todo;
