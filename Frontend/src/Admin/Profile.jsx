import React from "react";
import { useAuth } from "../store/auth";
import { FaPhone, FaTwitter, FaGithub, FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

function Profile() {
  const { user } = useAuth();

  return (
    <div className="flex flex-col flex-1 items-center justify-center h-screen">
      <div className="w-full max-w-sm overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800">
        <img
          className="object-cover object-center w-full h-56"
          src="https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=2048&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="avatar"
        />

        <div className="px-6 py-4">
          <h1 className="text-xl font-semibold text-gray-800 dark:text-white">
            {user.username}
          </h1>
          <p className="py-2 text-gray-700 dark:text-gray-400">
            Full Stack Developer &amp; UI / UX Designer, love Music. Author of
            Building UI.
          </p>

          <div className="flex items-center mt-4 text-gray-700 dark:text-gray-200">
            <FaPhone />
            <a
              href={`tel:${user.phone}`}
              className="px-2 text-sm text-blue-500 hover:text-blue-700"
            >
              {user.phone}
            </a>
          </div>
          <div className="flex items-center mt-4 text-gray-700 dark:text-gray-200">
            <MdEmail />
            <a
              href={`mailto:${user.email}`}
              className="px-2 text-sm text-blue-500 hover:text-blue-700"
            >
              {user.email}
            </a>
          </div>

          {/* Social Media Links */}
          <div className="flex items-center mt-4 space-x-4">
            <a
              href="https://twitter.com/its_Praveen_s"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter className="text-blue-500 hover:text-blue-700" />
            </a>
            <a
              href="https://github.com/praveenskg"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub className="text-blue-800 hover:text-gray-900" />
            </a>
            <a
              href="https://www.linkedin.com/in/Praveenskg"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin className="text-blue-700 hover:text-blue-900" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
