import { useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../store/auth";

const Navbar = () => {
  const { Logout, isLoggedIn } = useAuth();
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

  const isLoginRoute = location.pathname === "/login";

  return (
    <>
      <nav className="bg-white dark:bg-gray-900 shadow-md p-4  dark:text-white">
        <div className="container mx-auto flex justify-between items-center">
          <NavLink
            to="/"
            className="text-gray-800 dark:text-white text-3xl font-bold"
          >
            <span className="text-2xl pl-8 sm:pl-0">
              Praveen<span className="text-indigo-600"> Singh</span>
            </span>
          </NavLink>
          <div className="hidden md:flex items-center space-x-4">
            <ul className="inline-flex space-x-8 ">
              {menuItems.map((item) => (
                <li key={item.name}>
                  <a href={item.href} className="  px-2 py-1">
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>

            {!isLoginRoute && (
              <div className=" lg:block">
                {isLoggedIn ? (
                  <button
                    type="button"
                    className="rounded-md bg-indigo-600 px-3 py-2 text-base font-semibold text-white shadow-sm hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                    onClick={() => {
                      Logout();
                      navigate("/login");
                    }}
                  >
                    Logout
                  </button>
                ) : (
                  <NavLink to="/login">
                    <button
                      type="button"
                      className="rounded-md bg-indigo-600 px-3 py-2 text-base font-semibold text-white shadow-sm hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                    >
                      Login
                    </button>
                  </NavLink>
                )}
              </div>
            )}
          </div>
          <div className="md:hidden">
            <button
              onClick={toggleNavbar}
              className="text-gray-800 dark:text-white focus:outline-none"
            >
              {isOpen ? (
                <svg
                  className="h-6 w-6 text-red-500 dark:text-red-300"
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
                  className="h-6 w-6  text-red-500 dark:text-red-300 "
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
            <div className="md:hidden fixed top-0 left-0 w-full h-full bg-gray-200 dark:bg-gray-900 text-center py-4  animate__animated animate__fadeIn ">
              <button
                onClick={closeNavbar}
                className="text-gray-800 dark:text-white absolute top-4 right-4 focus:outline-none"
              >
                <svg
                  className="h-6 w-6 text-red-500 dark:text-red-300"
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
                      className="block py-2 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700 transition duration-300 "
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
              {!isLoginRoute && (
                <div>
                  {isLoggedIn ? (
                    <button
                      type="button"
                      className="mt-4 w-4/5 rounded-md bg-indigo-600 px-5 py-2 text-base font-semibold text-white shadow-sm hover:bg-rose-500"
                      onClick={() => {
                        Logout();
                        closeNavbar();
                        navigate("/login");
                      }}
                    >
                      Logout
                    </button>
                  ) : (
                    <NavLink to="/login">
                      <button
                        onClick={closeNavbar}
                        type="button"
                        className="mt-4 w-4/5 rounded-md bg-indigo-600 px-5 py-2 text-base font-semibold text-white shadow-sm hover:bg-rose-500 "
                      >
                        Login
                      </button>
                    </NavLink>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
