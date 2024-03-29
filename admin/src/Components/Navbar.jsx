import { NavLink, useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import {
  ArrowDown,
  ArrowUp,
  LogOutIcon,
  SearchIcon,
  ThreeBarIcon,
} from "../assets/icons";
import { profileNavigationItems } from "../data";
import { useAuth } from "../context/AuthContext";
import { Menu } from "@headlessui/react";
import { toast } from "react-hot-toast";

const Navbar = () => {
  const { setIsOpenSidebar, user, Logout, isLoading, userAuthentication } =
    useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    toast.success("Logout successful");
    setTimeout(() => {
      Logout();
      navigate("/login");
    }, 1000);
  };

  useEffect(() => {
    userAuthentication();
  }, [userAuthentication]);

  if (isLoading) {
    return <h1>Loading ...</h1>;
  }

  if (!user || !user.isAdmin) {
    return navigate("/login");
  }

  return (
    <div className="fixed left-0 right-0 top-0 flex h-[65px] items-center justify-between bg-white pr-5 shadow backdrop-blur dark:bg-gray-700/50 dark:shadow-white/10 xl:left-[300px]">
      <div className="flex flex-1 items-center gap-4 pl-4 xl:pl-2 pr-4">
        <button
          className="text-2xl xl:hidden"
          onClick={() => setIsOpenSidebar(true)}
        >
          <ThreeBarIcon />
        </button>
        <form className="w-full">
          <label className="relative block">
            <span className="sr-only">Search</span>
            <span className="absolute inset-y-0 left-0 pl-2  flex items-center">
              <SearchIcon className="h-5 w-5 text-gray-300 dark:text-gray-500" />
            </span>
            <input
              className="block w-full rounded-md border border-none  !bg-transparent py-2 pl-10 pr-3 placeholder:text-gray-400 outline-none"
              placeholder="Search for..."
              type="text"
              name="search"
            />
          </label>
        </form>
      </div>
      <div>
        <div>
          <Menu as="div" className="relative">
            {({ open }) => (
              <>
                <Menu.Button className="flex items-center gap-3">
                  <img
                    src={user && user.image ? user.image : null}
                    alt={`${user.username}s Pic`}
                    className={`h-9 w-9 rounded-full ring-2 ring-offset-2 dark:ring-offset-gray-800  ${
                      open
                        ? "ring-gray-300 dark:ring-gray-400"
                        : "ring-transparent "
                    }`}
                  />
                  <div className="hidden items-center gap-1 font-bold xl:inline-flex">
                    {user.username}

                    {open ? <ArrowUp /> : <ArrowDown />}
                  </div>
                </Menu.Button>
                <Menu.Items className="absolute right-0 top-[44px] flex w-[240px] flex-col overflow-hidden rounded-xl border border-gray-100 bg-white text-gray-700 shadow-lg dark:border-gray-600 dark:bg-gray-700 dark:shadow-white/5">
                  <div className="relative flex w-full gap-3 border-b p-3.5 dark:border-gray-600">
                    <div>
                      <img
                        src={user && user.image ? user.image : null}
                        alt={`${user.username}s Pic`}
                        className="block h-10 w-10 min-w-[40px] rounded-md"
                      />
                    </div>
                    <div className="max-w-[150px] flex-1">
                      <h3 className="block truncate font-bold leading-tight dark:text-white">
                        {user.username}
                      </h3>
                      {user.isAdmin ? (
                        <h4 className="text-sm text-green-500 dark:text-green-400">
                          Admin
                        </h4>
                      ) : (
                        <h4 className="text-sm text-rose-500 dark:text-gray-400">
                          User
                        </h4>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col py-2">
                    {profileNavigationItems.map((navItem) => (
                      <NavLink
                        key={navItem.id}
                        className="flex items-center gap-2 px-4 py-1.5 font-semibold text-gray-600 transition-colors duration-200 hover:bg-gray-50 hover:text-gray-800 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                        to={navItem.path}
                      >
                        <navItem.icon className="text-xl text-gray-400" />{" "}
                        {navItem.name}
                      </NavLink>
                    ))}
                  </div>
                  <button
                    className="flex items-center gap-2 border-t border-gray-100 px-4 py-2 font-semibold text-gray-600 transition-colors duration-200 hover:bg-gray-50 hover:text-gray-800 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                    onClick={handleLogout}
                  >
                    <LogOutIcon className="text-lg text-gray-400" /> Log out
                  </button>
                </Menu.Items>
              </>
            )}
          </Menu>
        </div>
      </div>
    </div>
  );
};
export default Navbar;
