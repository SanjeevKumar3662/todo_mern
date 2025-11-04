import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { setUser } = useContext(AuthContext);

  const navigate = useNavigate();

  const API_URI = import.meta.env.VITE_API_URI;

  const handleClickLoginUser = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URI}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
        credentials: "include",
      });
      const data = await response.json();
      const user = await data.data;

      if (response.status === 200) {
        console.log(`${user.username} is logged in`);
        console.log(response, user);

        // window.location.reload();
        setUser(user);
        navigate("/");
      }
    } catch (error) {
      console.error("Error while loggin in user", error);
    }
  };
  return (
    <div className="auth-form">
      <h1>This is a User Login From</h1>
      <form onSubmit={handleClickLoginUser}>
        <div>
          <label htmlFor="username" name="username">
            Username
          </label>
          <input
            type="text"
            id="username"
            title="username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="password" name="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            title="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};
