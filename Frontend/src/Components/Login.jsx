import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";
const URL = "http://localhost:5000/api/auth/login";

function Login() {
  const navigate = useNavigate();
  const { StoreToken } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      console.log("Login", response);
      const res_data = await response.json();
      if (response.ok) {
        StoreToken(res_data.data.token);
        toast.success("Login successful");
        setUser({
          email: "",
          password: "",
        });
        navigate("/");
      } else {
        toast.error(
          res_data.extraDetails ? res_data.extraDetails : res_data.message
        );
      }
    } catch (error) {
      console.log("Login", error);
    }
  };

  return (
    <section className="bg-white dark:bg-gray-900 dark:text-white ">
      <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
        <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
          <h2 className="text-center text-2xl font-bold leading-tight ">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-base text-white">
            Don&apos;t have an account?
            <NavLink
              to="/register"
              className="font-medium  text-indigo-600 transition-all duration-200 hover:underline"
            >
              Create a free account
            </NavLink>
          </p>
          <form onSubmit={handleSubmit} method="POST" className="mt-8">
            <div className="space-y-5">
              <div>
                <label htmlFor="email" className="text-base font-medium">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="email"
                    required
                    name="email"
                    placeholder="Email"
                    value={user.email}
                    id="email"
                    onChange={handleInput}
                  ></input>
                </div>
              </div>
              <div>
                <div>
                  <label htmlFor="password" className="text-base font-medium">
                    Password
                  </label>
                </div>
                <div className="mt-2 relative rounded-md shadow-sm">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 pr-10"
                    type={showPassword ? "text" : "password"}
                    required
                    name="password"
                    autoComplete="off"
                    value={user.password}
                    placeholder="Password"
                    id="password"
                    onChange={handleInput}
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
                    <button
                      type="button"
                      className="text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-700"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? (
                        <svg
                          className="h-5 w-5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M19.707 9.293a1 1 0 010 1.414l-9 9a1 1 0 01-1.414 0l-9-9a1 1 0 111.414-1.414L10 16.086l8.293-8.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="h-5 w-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          ></path>
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 12a6 6 0 1112 0 6 6 0 01-12 0z"
                          ></path>
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center rounded-md bg-indigo-600 px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-indigo-700"
                >
                  Login
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Login;
