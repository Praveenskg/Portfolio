import React, { useEffect } from "react";
import { NavLink, Navigate } from "react-router-dom";
import { FaHome, FaUsers } from "react-icons/fa";
import { FiMessageSquare } from "react-icons/fi";
import { MdLogout } from "react-icons/md";
import { FaUserAlt } from "react-icons/fa";
import { toast } from "react-toastify";

import { useAuth } from "../../store/auth";
function AdminNavbar() {
  const { user, Logout, isLoading, userAuthentication } = useAuth();

  useEffect(() => {
    userAuthentication();
  }, [userAuthentication]);

  const handleLogout = async () => {
    toast.success("Logout successful");
    setTimeout(() => {
      Logout();
      <Navigate to="/login" />;
    }, 1000);
  };
  if (isLoading) {
    return <h1>Loading ...</h1>;
  }

  if (!user.isAdmin) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <aside className="flex flex-col w-64 h-screen overflow-y-auto px-5 py-8 bg-white border-r rtl:border-r-0 rtl:border-l dark:bg-gray-900 dark:border-gray-700">
        <div className="flex flex-col justify-between flex-1 mt-6">
          <nav className="flex-1 -mx-3 space-y-3">
            <NavLink
              to="/admin/dashboard"
              className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
            >
              <FaHome />
              <span className="mx-2 text-sm font-medium">Home</span>
            </NavLink>
            <NavLink
              to="/admin/contacts"
              className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
            >
              <FiMessageSquare />
              <span className="mx-2 text-sm font-medium">Contacts</span>
            </NavLink>
            <NavLink
              to="/admin/users"
              className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
            >
              <FaUsers />
              <span className="mx-2 text-sm font-medium">Users</span>
            </NavLink>
            <NavLink
              to="/admin/profile"
              className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700"
            >
              <FaUserAlt />
              <span className="mx-2 text-sm font-medium">Profile</span>
            </NavLink>
          </nav>
          <div className="mt-6">
            <div className="flex items-center justify-between mt-6">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                {user && `Welcome, ${user.username}`}
              </span>
              <button
                className="text-gray-500 transition-colors duration-200 rotate-180 dark:text-gray-400 rtl:rotate-0 hover:text-blue-500 dark:hover:text-blue-400"
                onClick={handleLogout}
              >
                <MdLogout />
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

export default AdminNavbar;
