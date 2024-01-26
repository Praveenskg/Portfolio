import React from "react";
import { FaHome } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

function Breadcrumb() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);
  return (
    <nav
      className="flex w-full  items-left bg-gray-700 p-2 text-white capitalize"
      aria-label="Breadcrumb"
    >
      <ol className="inline-flex items-center space-x-0 md:space-x-3">
        <li className="inline-flex items-center">
          <Link
            to="/"
            className="ml-1 inline-flex text-sm font-medium text-white hover:underline md:ml-2"
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
                <span className="mx-1 text-white">/</span>
                {isLast ? (
                  <span className="ml-1 text-sm font-medium text-white  md:ml-2">
                    {name}
                  </span>
                ) : (
                  <Link
                    to={routeTo}
                    className="ml-1 text-sm font-medium text-white  md:ml-2"
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
