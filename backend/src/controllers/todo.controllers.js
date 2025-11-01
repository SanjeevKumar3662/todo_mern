import Todo from "../models/todo.model.js";

export const getAlltodos = async (req, res) => {
  try {
    const todos = await Todo.find({});
    res.send(todos);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
};

export const createTodo = async (req, res) => {
  try {
    console.log("body -> ", req.body);
    const { title, description } = req.body;
    const todo = await Todo.create({ title, description });
    // console.log(todo);
    res.status(200).json({ message: "Created Successfully", result: todo });
    console.log(title, "created");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteTodo = async (req, res) => {
  try {
    const deletedTodo = await Todo.deleteOne({ _id: req.params.id });
    // console.log(req.params.id);

    if (deletedTodo.deletedCount === 1) {
      console.log("todo deleted");
      res.sendStatus(200);
    } else {
      res.status(404).json({ message: "Todo not found" });
      console.log("404 can't find todo");
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
    console.log(err.message);
  }
};
