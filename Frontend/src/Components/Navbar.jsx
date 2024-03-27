import { useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";
import { FaMoon, FaSun } from "react-icons/fa6";
const Navbar = () => {
  const { Logout, isLoggedIn, isDarkMode, toggleDarkMode } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const closeNavbar = () => {
    setIsOpen(false);
  };

  const menuItems = [
    {
      name: "About",
      href: "/#about",
    },
    {
      name: "Projects",
      href: "/#projects",
    },
    {
      name: "Contact",
      href: "/#contact",
    },
  ];

  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      {!isAdminRoute && (
        <nav
          className={`${
            isDarkMode ? "text-white" : "bg-white text-black"
          }  shadow-md p-4 `}
        >
          <div className="container mx-auto flex justify-between items-center">
            <NavLink to="/" className="  text-3xl font-bold">
              <span className="text-2xl pl-2 sm:pl-0 bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent ">
                Praveen
                <span className="bg-gradient-to-r from-fuchsia-500 to-cyan-500 bg-clip-text text-transparent mx-1">
                  Singh
                </span>
              </span>
            </NavLink>
            <div className="hidden md:flex items-center space-x-4">
              <ul className="inline-flex space-x-8 font-bold ">
                {menuItems.map((item) => (
                  <li key={item.name}>
                    <a href={item.href} className="px-2 py-1">
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
              <button onClick={toggleDarkMode} className="px-2 py-1 text-2xl">
                {isDarkMode ? <FaSun /> : <FaMoon />}
              </button>
            </div>
            <div className="md:hidden">
              <button onClick={toggleDarkMode} className="px-2 py-1 text-2xl">
                {isDarkMode ? <FaSun /> : <FaMoon />}
              </button>
              <button
                onClick={toggleNavbar}
                className="text-gray-800 dark:text-white focus:outline-none"
              >
                {isOpen ? (
                  <svg
                    className={`${
                      isDarkMode ? "text-white" : "text-black  "
                    } h-6 w-6`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    ></path>
                  </svg>
                ) : (
                  <svg
                    className={`${
                      isDarkMode ? "text-white" : "text-black"
                    } h-6 w-6`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16m-7 6h7"
                    ></path>
                  </svg>
                )}
              </button>
            </div>
            {isOpen && (
              <div className="md:hidden fixed top-0 left-0 w-full h-full  dark:bg-gray-900 text-center py-4  animate__animated animate__fadeIn ">
                <button
                  onClick={closeNavbar}
                  className="absolute top-4 right-4 focus:outline-none"
                >
                  <svg
                    className={`${
                      isDarkMode ? "text-white" : "text-black  "
                    } h-6 w-6`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    ></path>
                  </svg>
                </button>
                <ul>
                  {menuItems.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        onClick={closeNavbar}
                        className="block py-2  transition duration-300 text-white "
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </nav>
      )}
    </>
  );
};

export default Navbar;
