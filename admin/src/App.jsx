import { Route, Routes, useNavigate } from "react-router-dom";
import RootLayout from "./Layout/RootLayout";
import { Dashboard, Users } from "./pages";
import { useEffect } from "react";

import { useAuth } from "./context/AuthContext";
import { Login, Register } from "./Components";

const App = () => {
  // set primary color
  const setPrimaryColor = () => {
    if (localStorage.getItem("primaryColor")) {
      document.documentElement.style.setProperty(
        "--color-primary",
        localStorage.getItem("primaryColor")
      );
    }
  };
  useEffect(() => {
    setPrimaryColor();
  }, []);

  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="users" element={<Users />} />
      </Route>
    </Routes>
  );
};

export default App;
