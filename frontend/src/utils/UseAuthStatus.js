import { useEffect, useState } from "react";
import { apiClient } from "./apiClient"; // your wrapper

const useAuthStatus = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await apiClient("/users/get-me"); // apiClient already includes credentials
        if (res.ok) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch (err) {
        setIsLoggedIn(false);
        console.error(err.message);
      }
    };

    checkAuth();
  }, []);

  return isLoggedIn;
};

export default useAuthStatus;
