import { useContext, useState } from "react";
import "./App.css";

import Todos from "./components/Todos";
import { TodoForm } from "./components/TodoForm";
import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import { ResgisterForm } from "./components/user-auth-form/RegisterForm";
import { LoginForm } from "./components/user-auth-form/LoginForm";
import { AuthContext } from "./components/context/AuthContext";

function App() {
  // const [count, setCount] = useState(0)
  const [todos, setTodos] = useState([]);
  const { user } = useContext(AuthContext);
  // console.log(user);

  return (
    <>
      <Header></Header>
      <div className="container">
        <Routes>
          <Route
            path="/"
            element={
              <div className="main">
                <h1>
                  {user === null
                    ? "Login to Create/Delete a todo"
                    : `${user.username} is logged in`}
                </h1>
                <TodoForm todos={todos} setTodos={setTodos} />
                <Todos todos={todos} setTodos={setTodos} />
              </div>
            }
          ></Route>
          <Route path="/register" element={<ResgisterForm />} />
          <Route path="/login" element={<LoginForm />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
