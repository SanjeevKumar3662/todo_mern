# 📝 Todo App API (with Authentication)

A **Node.js + Express** backend API for a Todo application that supports **user authentication** using **JWT tokens**.  
Only registered and logged-in users can create or delete todos, while anyone can view all todos publicly.

---

## 🚀 Features

- 🔐 **JWT-based authentication**
- 🧾 **User registration and login**
- 🔄 **Access & refresh token support**
- ✅ **Protected routes**
- 🗒️ **CRUD operations for todos (Create, Read, Delete)**
- 🚫 **Only authenticated users can add or delete todos**
- 🌍 **Public route for viewing all todos**

---

## 🏗️ Tech Stack

- **Node.js**
- **Express.js**
- **JWT (JSON Web Token)**
- **MongoDB** (optional if connected)
- **CORS & Middleware-based authentication**

---

## 📁 Project Structure

<pre>
📦 todo-app-api
┣ 📂 controllers
┃ ┣ 📜 user.controller.js
┃ ┗ 📜 todo.controller.js
┣ 📂 middlewares
┃ ┗ 📜 auth.middleware.js
┣ 📂 routes
┃ ┣ 📜 user.routes.js
┃ ┗ 📜 todo.routes.js
┣ 📜 server.js
┗ 📜 package.json
</pre>

---

## 🔑 Authentication Flow

| Endpoint                   | Method | Description                          | Auth Required |
| -------------------------- | ------ | ------------------------------------ | ------------- |
| `/api/users/register`      | POST   | Register a new user                  | ❌ No         |
| `/api/users/login`         | POST   | Log in and get access/refresh tokens | ❌ No         |
| `/api/users/refresh-token` | POST   | Refresh access token                 | ❌ No         |
| `/api/users/auth-test`     | POST   | Test if user is authenticated        | ✅ Yes        |
| `/api/users/get-me`        | GET    | Get current logged-in user info      | ✅ Yes        |
| `/api/users/logout`        | DELETE | Log out user and invalidate token    | ✅ Yes        |

---

## 🗒️ Todo Routes

| Endpoint                | Method | Description            | Auth Required |
| ----------------------- | ------ | ---------------------- | ------------- |
| `/api/todos/all-todos`  | GET    | Get all todos (public) | ❌ No         |
| `/api/todos/create`     | POST   | Create a new todo      | ✅ Yes        |
| `/api/todos/delete/:id` | DELETE | Delete a todo by ID    | ✅ Yes        |

---

## 🧠 Middleware

### `authenticateToken`

Used to protect secured routes.  
Checks if the incoming request contains a valid JWT token in the header.

```js
import { authenticateToken } from "../middlewares/auth.middleware.js";
router.route("/create").post(authenticateToken, createTodo);
```

## 🧰 Example Usage

Register a new user

```
POST /api/users/register
{
  "username": "John",
  "email": "john@example.com",
  "password": "123456"
}
```

Login

```
POST /api/users/login
{
  "email": "john@example.com",
  "password": "123456"
}
```

Create a todo

```
POST /api/todos/create
Headers: { Authorization: "Bearer <access_token>" }

{
  "title": "Learn Express.js"
}
```

## 📜 License

This project is open-source and available under the MIT License.

#### 👨‍💻 Author

Linkedin : [Sanjeev Kumar](https://www.linkedin.com/in/sanjeevkumar3662/)
