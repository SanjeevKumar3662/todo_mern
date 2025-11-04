import { useState, useEffect } from "react";
import { apiClient } from "../../utils/apiClient";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // ✅ Check if user is already logged in on mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await apiClient(`/users/get-me`, {
          credentials: "include", // send cookies
        });
        if (response.ok) {
          const data = await response.json();
          setUser(data.data);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Error checking user auth:", error);
      }
    };
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
