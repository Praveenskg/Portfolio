import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import Login from "./Components/Login";
import Footer from "./Components/Footer";
import Register from "./Components/Register";
import AdminContacts from "./Admin/AdminContacts";
import AdminUsers from "./Admin/AdminUsers";
import AdminUpdate from "./Admin/AdminUpdate";
import Profile from "./Admin/Profile";
import Admin from "./Admin/Admin";
import Dashboard from "./Admin/Dashboard";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={<Admin />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="contacts" element={<AdminContacts />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="profile" element={<Profile />} />
            <Route path="users/:id/edit" element={<AdminUpdate />} />
          </Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
};
export default App;
