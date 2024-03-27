import React from "react";
import { FaHome } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../store/auth";

function Breadcrumb() {
  const { isDarkMode } = useAuth();
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);
  return (
    <nav
      className={`flex  items-left  ${
        isDarkMode ? "bg-gray-700 text-white" : "text-black bg-gray-200"
      } capitalize`}
      aria-label="Breadcrumb"
    >
      <ol className="inline-flex items-center space-x-0 md:space-x-3">
        <li className="inline-flex items-center">
          <Link
            to="/"
            className="ml-1 inline-flex text-sm font-medium  hover:underline md:ml-2"
          >
            <FaHome />
          </Link>
        </li>
        {pathnames.map((name, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
          const isLast = index === pathnames.length - 1;
          return (
            <li key={name}>
              <div className="flex items-center">
                <span className="mx-1 ">/</span>
                {isLast ? (
                  <span className="ml-1 text-sm font-medium  md:ml-2">
                    {name}
                  </span>
                ) : (
                  <Link
                    to={routeTo}
                    className="ml-1 text-sm font-medium  md:ml-2"
                  >
                    {name}
                  </Link>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
export default Breadcrumb;
