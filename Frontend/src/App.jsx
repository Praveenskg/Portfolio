import { BrowserRouter, Route, Routes } from "react-router-dom";

import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import Login from "./Components/Login";
import Footer from "./Components/Footer";
import Register from "./Components/Register";
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
};
export default App;
