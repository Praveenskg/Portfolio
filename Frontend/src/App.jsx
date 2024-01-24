import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import Login from "./Components/Login";
import Footer from "./Components/Footer";
import Register from "./Components/Register";
import Admin from "./Components/Admin/Admin";
import AdminContacts from "./Components/Admin/AdminContacts";
import AdminUsers from "./Components/Admin/AdminUsers";
import AdminUpdate from "./Components/Admin/AdminUpdate";
import Profile from "./Components/Admin/Profile";
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
