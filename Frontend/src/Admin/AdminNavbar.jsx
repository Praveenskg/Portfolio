import React, { useEffect, useState } from "react";
import { NavLink, Navigate, useNavigate, Outlet } from "react-router-dom";
import { FaHome, FaUsers } from "react-icons/fa";
import { FiMessageSquare } from "react-icons/fi";
import { MdLogout } from "react-icons/md";
import { FaUserAlt } from "react-icons/fa";
import { toast } from "react-toastify";

import { useAuth } from "../store/auth";

function AdminNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const {
    user,
    Logout,
    isLoading,
    userAuthentication,
    isDarkMode,
    toggleDarkMode,
  } = useAuth();

  // State to manage sidebar collapse
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    userAuthentication();
  }, [userAuthentication]);

  const handleLogout = async () => {
    toast.success("Logout successful");
    setTimeout(() => {
      Logout();
      navigate("/login");
    }, 1000);
  };

  // Toggle sidebar collapse
  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  if (isLoading) {
    return <h1>Loading ...</h1>;
  }

  if (!user.isAdmin) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <aside
        className={`flex flex-col w-full md:w-64 h-screen overflow-y-auto px-5 py-8 transition-all duration-300 ${
          sidebarCollapsed ? "-translate-x-full md:translate-x-0" : ""
        } ${
          isDarkMode
            ? "bg-gray-700 border-gray-700"
            : "bg-gray-200 border-r text-slate-950"
        } rtl:border-r-0 rtl:border-l`}
      >
        <div className="flex items-center justify-between">
          <NavLink to="/admin/profile">
            <span
              className={`text-sm font-medium ${
                isDarkMode ? "text-gray-200" : "text-gray-900"
              }`}
            >
              {user && `Welcome, ${user.username}`}
            </span>
          </NavLink>
          <button
            className={`transition-colors duration-200 ${
              isDarkMode
                ? "text-white hover:text-red-400"
                : "text-gray-900 hover:text-blue-500"
            }`}
            onClick={handleLogout}
          >
            <MdLogout />
          </button>
        </div>

        <div className="flex flex-col justify-between flex-1 mt-6">
          <nav className={`flex-1 -mx-3 space-y-3  `}>
            <NavLink
              to="/admin"
              className={`flex items-center px-3 py-2  transition-colors duration-300 transform rounded-lg ${
                isDarkMode
                  ? "text-white hover:bg-gray-800 "
                  : "text-gray-900 hover:bg-gray-800 hover:text-gray-200"
              }`}
            >
              <FaHome />
              <span className="mx-2 text-base font-medium">Home</span>
            </NavLink>
            <NavLink
              to="/admin/contacts"
              className={`flex items-center px-3 py-2  transition-colors duration-300 transform rounded-lg ${
                isDarkMode
                  ? "text-white hover:bg-gray-800 "
                  : "text-gray-900 hover:bg-gray-800 hover:text-gray-200"
              }`}
            >
              <FiMessageSquare />
              <span className="mx-2 text-base font-medium">Contacts</span>
            </NavLink>
            <NavLink
              to="/admin/users"
              className={`flex items-center px-3 py-2  transition-colors duration-300 transform rounded-lg ${
                isDarkMode
                  ? "text-white hover:bg-gray-800 "
                  : "text-gray-900 hover:bg-gray-800 hover:text-gray-200"
              }`}
            >
              <FaUsers />
              <span className="mx-2 text-base font-medium">Users</span>
            </NavLink>
            <NavLink
              to="/admin/profile"
              className={`flex items-center px-3 py-2  transition-colors duration-300 transform rounded-lg ${
                isDarkMode
                  ? "text-white hover:bg-gray-800 "
                  : "text-gray-900 hover:bg-gray-800 hover:text-gray-200"
              }`}
            >
              <FaUserAlt />
              <span className="mx-2 text-base font-medium">Profile</span>
            </NavLink>
          </nav>

          <div className="mt-6">
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={isDarkMode}
                onChange={toggleDarkMode}
              />
              <div className="w-24 h-12 rounded-full ring-0 peer duration-500 outline-none bg-gray-200 overflow-hidden before:flex before:items-center before:justify-center after:flex after:items-center after:justify-center before:content-['☀️'] before:absolute before:h-10 before:w-10 before:top-1/2 before:bg-white before:rounded-full before:left-1 before:-translate-y-1/2 before:transition-all before:duration-700 peer-checked:before:opacity-0 peer-checked:before:rotate-90 peer-checked:before:-translate-y-full shadow-lg shadow-gray-400 peer-checked:shadow-lg peer-checked:shadow-gray-700 peer-checked:bg-[#383838] after:content-['🌑'] after:absolute after:bg-[#1d1d1d] after:rounded-full after:top-[4px] after:right-1 after:translate-y-full after:w-10 after:h-10 after:opacity-0 after:transition-all after:duration-700 peer-checked:after:opacity-100 peer-checked:after:rotate-180 peer-checked:after:translate-y-0"></div>
            </label>
          </div>
        </div>
      </aside>

      {/* Toggle button for sidebar */}
      <button
        className="fixed top-5 left-5 md:hidden z-10"
        onClick={toggleSidebar}
      >
        <svg
          className={`w-8 h-8 text-gray-500 ${
            sidebarCollapsed ? "rotate-180" : ""
          }`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M18 6L6 18"></path>
          <path d="M6 6L18 18"></path>
        </svg>
      </button>
    </>
  );
}

export default AdminNavbar;
