import { useState } from "react";

export const ResgisterForm = () => {
  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const API_URI = import.meta.env.VITE_API_URI;

  const handleClickRegisterUser = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_URI}/users/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          fullname,
          email,
          password,
        }),
        credentials: "include",
      });

      // const data = await response.json();
      console.log(response);
    } catch (error) {
      console.error("error while registering user", error.message);
    }
  };

  return (
    <div className="auth-form">
      <h1>This is a User Registeration From</h1>
      <form onSubmit={handleClickRegisterUser}>
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
          <label htmlFor="fullname" name="fullname">
            Fullname
          </label>
          <input
            type="text"
            id="fullname"
            title="fullname"
            onChange={(e) => setFullname(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="email" name="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            title="email"
            onChange={(e) => setEmail(e.target.value)}
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
