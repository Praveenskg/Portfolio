import { createContext, useContext, useState, useEffect } from "react";
import toast from "react-hot-toast";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [user, setUser] = useState({});
  const [isOpenSidebar, setIsOpenSidebar] = useState(false);
  const [showPassword, setShowPassword] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const authorizationToken = `Bearer ${token}`;
  const API = "http://localhost:5000/api";

  const StoreToken = (serverToken) => {
    setToken(serverToken);
    localStorage.setItem("token", serverToken);
  };

  const Logout = () => {
    setToken("");
    localStorage.removeItem("token");
  };

  const isLoggedIn = !!token;
  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const userAuthentication = async () => {
    try {
      const response = await fetch(`${API}/admin/user`, {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
        setIsLoading(false);
      } else {
        setIsLoading(false);
        setUser(null);
      }
    } catch (error) {
      console.log(`Error Fetching user data `, error);
      setUser(null); // Clear user data if there is an error
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      userAuthentication();
    } else {
      setIsLoading(false);
    }
  }, [isLoggedIn]);

  return (
    <AuthContext.Provider
      value={{
        StoreToken,
        Logout,
        isLoggedIn,
        authorizationToken,
        user,
        isLoading,
        userAuthentication,
        API,
        isOpenSidebar,
        setIsOpenSidebar,
        togglePassword,
        showPassword,
      }}
    >
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
