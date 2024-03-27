import { useState } from "react";
import { toast } from "react-hot-toast";
import { NavLink, useNavigate } from "react-router-dom";
import { FaEyeSlash, FaEye } from "react-icons/fa6";
import { useAuth } from "../context/AuthContext";

function Register() {
  const navigate = useNavigate();
  const { StoreToken, API } = useAuth();
  const [showPassword, setShowPassword] = useState(true);
  const [user, setUser] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleInput = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const res_data = await response.json();
      if (response.ok) {
        StoreToken(res_data.data.token);
        setUser({ username: "", email: "", phone: "", password: "" });
        toast.success("Registration successful");
        navigate("/login");
      } else {
        toast.error(
          res_data.extraDetails ? res_data.extraDetails : res_data.message
        );
      }
    } catch (error) {
      console.log("Register", error);
    }
  };

  return (
    <>
      <section className="flex items-center justify-center h-screen bg-white text-black">
        <div className="max-w-2xl w-full p-4">
          <div className="relative">
            <div className="bg-white shadow-2xl rounded-xl p-10">
              <p className="text-4xl font-medium text-center leading-snug font-serif text-black mb-6">
                Sign Up to Create Account
              </p>
              <div className="space-y-6">
                <div className="relative">
                  <label
                    htmlFor="name"
                    className="absolute bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 ml-2 text-gray-600 font-medium"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    required
                    id="username"
                    name="username"
                    placeholder="Enter your full name"
                    value={user.username}
                    onChange={handleInput}
                    className="border text-black placeholder-gray-400 focus:outline-none focus:border-indigo-400 w-full py-4 px-4 text-base block border-gray-300 rounded-md"
                  />
                </div>
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
                    placeholder="name@domain.com"
                    value={user.email}
                    onChange={handleInput}
                    className="border text-black placeholder-gray-400 focus:outline-none focus:border-indigo-400 w-full py-4 px-4 text-base block border-gray-300 rounded-md"
                  />
                </div>
                <div className="relative">
                  <label
                    htmlFor="email"
                    className="absolute bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 ml-2 text-gray-600 font-medium"
                  >
                    Phone
                  </label>
                  <input
                    type="text"
                    required
                    id="phone"
                    name="phone"
                    placeholder="Enter your 10-digit Mobile"
                    value={user.phone}
                    onChange={handleInput}
                    className="border text-black placeholder-gray-400 focus:outline-none focus:border-indigo-400 w-full py-4 px-4 text-base block border-gray-300 rounded-md"
                    inputMode="numeric"
                    pattern="[0-9]*"
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
                    value={user.password}
                    placeholder="Password"
                    onChange={handleInput}
                    className="border text-black placeholder-gray-400 focus:outline-none focus:border-indigo-400 w-full py-4 px-4 text-base block bg-white border-gray-300 rounded-md"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
                    <button
                      type="button"
                      className="text-black"
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
                  Register
                </button>
                <p className="flex items-center justify-center text-base text-black">
                  Already have an account?
                  <NavLink
                    to="/"
                    className="ml-2 font-medium text-indigo-600 transition-all duration-200"
                  >
                    Login Here
                  </NavLink>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Register;
