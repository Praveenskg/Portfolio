import { createContext, useContext, useState, useEffect } from "react";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const authorizationToken = `Bearer ${token}`;
  const API = "http://localhost:5000";

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
      const response = await fetch(`${API}/api/auth/user`, {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setUser(data.userData);
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      console.log(`Error Fetching user data `, error);
    }
  };

  const [isDarkMode, setIsDarkMode] = useState(
    window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
  );

  useEffect(() => {
    userAuthentication();
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const listener = (e) => setIsDarkMode(e.matches);
    mediaQuery.addEventListener("change", listener);
    return () => mediaQuery.removeEventListener("change", listener);
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

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
        isDarkMode,
        toggleDarkMode,
        API,
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
