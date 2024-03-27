import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

function Login() {
  const { StoreToken, user, isDarkMode, API } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const res_data = await response.json();
      if (response.ok) {
        StoreToken(res_data.data.token);
        toast.success("Login successful");
        console.log("User after login:", user); // Log user object here

        // Check if isAdmin property is correctly set
        console.log("Is Admin:", user.isAdmin);

        setUserData({
          email: "",
          password: "",
        });
        setTimeout(() => {
          if (user.isAdmin === true) {
            window.location.href = "/admin";
          } else {
            window.location.href = "/";
          }
        }, 1000);
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
    <section
      className={`flex items-center justify-center h-screen ${
        isDarkMode ? "text-white" : "bg-white text-black"
      }`}
    >
      <div className="max-w-2xl w-full p-4">
        <div className="relative">
          <div className="bg-white shadow-2xl rounded-xl p-10">
            <p className="text-4xl font-medium text-center leading-snug font-serif text-black mb-6">
              Login to your account
            </p>
            <div className="space-y-6">
              <div className="relative">
                <label
                  htmlFor="email"
                  className="absolute bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 ml-2 text-gray-600 font-medium"
                >
                  Email
                </label>
                <input
                  type="email"
                  required
                  id="email"
                  name="email"
                  autoComplete="off"
                  placeholder="Enter your email"
                  value={userData.email}
                  onChange={handleInput}
                  className={`border ${
                    isDarkMode ? "text-black" : "text-black"
                  } placeholder-gray-400 focus:outline-none focus:border-indigo-400 w-full py-4 px-4 text-base block border-gray-300 rounded-md`}
                />
              </div>
              <div className="relative">
                <label
                  htmlFor="password"
                  className="absolute bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 ml-2 text-gray-600 font-medium"
                >
                  Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  id="password"
                  name="password"
                  autoComplete="off"
                  value={userData.password}
                  placeholder="Password"
                  onChange={handleInput}
                  className={`border ${
                    isDarkMode ? "text-black" : "text-black"
                  } placeholder-gray-400 focus:outline-none focus:border-indigo-400 w-full py-4 px-4 text-base block bg-white border-gray-300 rounded-md`}
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
                  <button
                    type="button"
                    className={`${
                      isDarkMode ? "text-black" : "text-black"
                    } hover:text-gray-700 focus:outline-none focus:text-gray-700`}
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>
              <button
                onClick={handleSubmit}
                className="w-full bg-indigo-500 text-white rounded-lg py-4 px-5 text-xl font-medium transition duration-200 hover:bg-indigo-600 ease"
              >
                Login
              </button>
              <p className="flex items-center justify-center text-base text-black">
                Don't have an account?
                <NavLink
                  to="/register"
                  className="ml-2 font-medium text-indigo-600 transition-all duration-200"
                >
                  Register Here
                </NavLink>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
