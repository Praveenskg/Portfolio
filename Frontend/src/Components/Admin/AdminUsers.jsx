import React, { useEffect, useState } from "react";
import { useAuth } from "../../store/auth";
import { MdModeEdit } from "react-icons/md";
import { FaTrash } from "react-icons/fa6";
import { toast } from "react-toastify";

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const { authorizationToken, user: isLoggedIn } = useAuth();

  const getAllUsersData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/admin/users", {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllUsersData();
  }, []);

  const handleEdit = (Id) => {
    console.log(`Edit user with ID: ${Id}`);
  };

  const handleDelete = async (id) => {
    try {
      if (id === isLoggedIn._id) {
        toast.error("You cannot delete yourself!");
        return;
      }

      const response = await fetch(
        `http://localhost:5000/api/admin/users/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: authorizationToken,
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        getAllUsersData();
        toast.success(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex-1">
      <h2 className="text-center text-3xl">Admin User Data</h2>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-800">
          <tr className="text-base">
            <th className="px-4 py-3.5 text-left text-sm font-normal ">
              <span>Name</span>
            </th>
            <th className="px-12 py-3.5 text-left text-sm font-normal ">
              Email
            </th>
            <th className="px-4 py-3.5 text-left text-sm font-normal ">
              Phone
            </th>
            <th className="px-4 py-3.5 text-left text-sm font-normal ">Type</th>
            <th className="px-4 py-3.5 text-left text-sm font-normal ">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {users.map((user, index) => (
            <tr key={index}>
              <td className="whitespace-nowrap px-4 py-4">{user.username}</td>
              <td className="whitespace-nowrap px-12 py-4">{user.email}</td>
              <td className="whitespace-nowrap px-4 py-4">{user.phone}</td>
              <td className="whitespace-nowrap px-4 py-4">
                <span
                  className={`${
                    user.isAdmin
                      ? "rounded bg-green-400 py-1 px-3 text-xs font-bold"
                      : " rounded bg-red-400 py-1 px-3 text-xs font-bold"
                  }`}
                >
                  {user.isAdmin ? "Admin" : "User"}
                </span>
              </td>
              <td className="whitespace-nowrap px-4 py-4">
                <button
                  onClick={() => handleEdit(user._id)}
                  className="text-blue-500 hover:text-blue-700 bg-blue-100 px-2 py-1 rounded"
                >
                  <MdModeEdit />
                </button>
                <button
                  onClick={() => handleDelete(user._id)}
                  className="ml-2 text-red-500 hover:text-red-700 bg-red-100 px-2 py-1 rounded"
                  disabled={user._id === isLoggedIn._id}
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminUsers;