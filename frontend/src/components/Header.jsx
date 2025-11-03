import { useNavigate } from "react-router-dom";
import useAuthStatus from "../utils/UseAuthStatus.js";

import { apiClient } from "../utils/apiClient.js";

const Header = () => {
  const navigate = useNavigate();
  const isLoggedIn = useAuthStatus();

  const handleLogout = async () => {
    try {
      await apiClient("/users/logout", { method: "DELETE" });
      window.location.reload(); // or handle state update to redirect
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <header style={styles.header}>
      <h1 style={styles.title} onClick={() => navigate("/")}>
        Todo App
      </h1>
      <div style={styles.buttonContainer}>
        <button style={styles.homeButton} onClick={() => navigate("/")}>
          Home
        </button>

        {!isLoggedIn ? (
          <>
            <button
              style={styles.registerButton}
              onClick={() => navigate("/login")}
            >
              Login
            </button>
            <button
              style={styles.registerButton}
              onClick={() => navigate("/register")}
            >
              Register
            </button>
          </>
        ) : (
          <button style={styles.registerButton} onClick={handleLogout}>
            Logout
          </button>
        )}
      </div>
    </header>
  );
};

const styles = {
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    backgroundColor: "#282c34",
    color: "white",
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold",
  },
  buttonContainer: {
    display: "flex",
    gap: "10px",
  },
  homeButton: {
    padding: "10px 20px",
    fontSize: "16px",
    backgroundColor: "#4caf50",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    color: "white",
  },
  registerButton: {
    padding: "10px 20px",
    fontSize: "16px",
    backgroundColor: "#61dafb",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default Header;
