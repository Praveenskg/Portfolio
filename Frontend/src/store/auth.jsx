import { createContext, useContext, useState, useEffect } from "react";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [user, setUser] = useState("");

  const StoreToken = (serverToken) => {
    setToken(serverToken);
    localStorage.setItem("token", serverToken);
  };

  const Logout = () => {
    setToken("");
    localStorage.removeItem("token");
  };

  const isLoggedIn = !!token;

  const userAuthentication = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/user", {
        methods: "GET",
        headers: {
          Authorization: `Bearer${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setUser(data.userData);
      }
    } catch (error) {
      console.log(`Error Fetching user data `, error);
    }
  };

  useEffect(() => {
    userAuthentication();
  }, []);

  return (
    <AuthContext.Provider value={{ StoreToken, Logout, isLoggedIn, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const authContextValue = useContext(AuthContext);
  if (!authContextValue) {
    throw new Error("useAuth used outside of the Provider");
  }
  return authContextValue;
};
