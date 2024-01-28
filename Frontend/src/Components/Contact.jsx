import React, { useState } from "react";
import "animate.css/animate.min.css";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

const defaultContact = {
  username: "",
  email: "",
  phone: "",
  message: "",
};

const Contact = () => {
  const [contact, setContact] = useState(defaultContact);
  const [userData, setUserData] = useState(true);
  const { user, isDarkMode } = useAuth();

  if (userData && user) {
    setContact({
      username: user.username,
      email: user.email,
      phone: user.phone,
      message: "",
    });
    setUserData(false);
  }

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setContact({
      ...contact,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/form/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contact),
      });

      if (response.ok) {
        setContact(defaultContact);
        toast.success("Message sent successfully");
      }
    } catch (error) {
      toast.error("Message not sent");
      console.log(error);
    }
  };

  return (
    <>
      <section
        className={`${
          isDarkMode ? "bg-gray-800 text-white" : "text-black bg-gray-100"
        }  py-20 px-5  animate__animated animate__fadeIn capitalize`}
        id="contact"
      >
        <div className="py-8 lg:py-5 px-4 mx-auto max-w-screen-md">
          <h2 className="text-3xl font-bold mb-5 border-b-[5px] w-[200px] mx-auto border-indigo-600 pb-2">
            Contact Us
          </h2>
          <p className="mb-4 lg:mb-8 font-light text-center sm:text-xl">
            I would love to hear from you.
          </p>
          <div
            style={{
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              borderRadius: "10px",
              padding: "20px",
              marginTop: "20px",
            }}
          >
            <form className="space-y-3" onSubmit={handleSubmit}>
              <div>
                <label className="block mb-2 text-sm font-medium">
                  Your Name
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  onChange={handleInput}
                  required
                  autoComplete="off"
                  value={contact.username}
                  className={`shadow-sm border border-indigo-300 p-2.5 focus:ring-primary-500 focus:border-primary-500 ${
                    isDarkMode
                      ? "bg-gray-800 text-white"
                      : "text-black bg-gray-100"
                  }    block w-full text-sm rounded-lg`}
                  placeholder="Full Name"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium"
                >
                  Your email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  onChange={handleInput}
                  value={contact.email}
                  className={`shadow-sm border border-indigo-300 p-2.5 focus:ring-primary-500 focus:border-primary-500 ${
                    isDarkMode
                      ? "bg-gray-800 text-white"
                      : "text-black bg-gray-100"
                  }    block w-full text-sm rounded-lg`}
                  placeholder="name@domain.com"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium ">Phone</label>
                <input
                  type="number"
                  id="phone"
                  name="phone"
                  onChange={handleInput}
                  value={contact.phone}
                  className={`shadow-sm border border-indigo-300 p-2.5 focus:ring-primary-500 focus:border-primary-500 ${
                    isDarkMode
                      ? "bg-gray-800 text-white"
                      : "text-black bg-gray-100"
                  }    block w-full text-sm rounded-lg disabled:opacity-50 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
                  placeholder="Phone Number "
                  required
                />
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="message"
                  className="block mb-2 text-sm font-medium"
                >
                  Your message
                </label>
                <textarea
                  id="message"
                  name="message"
                  onChange={handleInput}
                  rows={6}
                  value={contact.message}
                  className={`shadow-sm border border-indigo-300 p-2.5 focus:ring-primary-500 focus:border-primary-500 ${
                    isDarkMode
                      ? "bg-gray-800 text-white"
                      : "text-black bg-gray-100"
                  }    block w-full text-sm rounded-lg resize-none`}
                  placeholder="Leave a message..."
                />
              </div>
              <button
                type="submit"
                className="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-indigo-600 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300"
              >
                Send message
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
