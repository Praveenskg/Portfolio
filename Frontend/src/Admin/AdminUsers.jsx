import React, { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import { MdModeEdit } from "react-icons/md";
import { FaTrash } from "react-icons/fa6";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Pagination from "./Pagination";

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 10;
  const { authorizationToken, user: isLoggedIn, API, isDarkMode } = useAuth();
  const navigate = useNavigate();

  const getAllUsersData = async () => {
    try {
      const response = await fetch(`${API}/api/admin/users`, {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });
      const data = await response.json();
      setUsers(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllUsersData();
  }, []);

  const handleEdit = (Id) => {
    navigate(`/admin/users/${Id}/edit`);
    console.log(`Edit user with ID: ${Id}`);
  };

  const handleDelete = async (id) => {
    try {
      if (id === isLoggedIn._id) {
        toast.error("You cannot delete yourself!");
        return;
      }

      const response = await fetch(`${API}/api/admin/users/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: authorizationToken,
        },
      });
      const data = await response.json();
      if (response.ok) {
        getAllUsersData();
        toast.success(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const changePage = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const totalPages = Math.ceil(users.length / itemsPerPage);
  return (
    <>
      <section
        className={`px-4  mx-auto max-w-full ${
          isDarkMode ? "bg-gray-800 text-white " : "bg-gray-100  text-black"
        }`}
      >
        <div className="flex flex-col mt-2">
          {loading ? (
            <div className="flex justify-center items-center h-screen">
              <div className="flex flex-row gap-2">
                <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce"></div>
                <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:-.3s]"></div>
                <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:-.5s]"></div>
              </div>
            </div>
          ) : (
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-800">
                      <tr>
                        <th
                          scope="col"
                          className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                        >
                          <button className="flex items-center gap-x-3 focus:outline-none">
                            <span>Name</span>
                          </button>
                        </th>
                        <th
                          scope="col"
                          className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                        >
                          Email
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                        >
                          Phone
                        </th>

                        <th
                          scope="col"
                          className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                        >
                          Type
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                        >
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                      {users
                        .slice(
                          (currentPage - 1) * itemsPerPage,
                          currentPage * itemsPerPage
                        )
                        .map((user, index) => (
                          <tr key={index}>
                            <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                              <div>
                                <h2 className="font-medium text-gray-800 dark:text-white">
                                  {user.username}
                                </h2>
                              </div>
                            </td>
                            <td className="px-12 py-4 text-sm font-medium whitespace-nowrap">
                              <div
                                className="inline px-3 py-1 text-sm font-normal rounded-full text-emerald-500 bg-emerald-100/60
                                 gap-x-2 dark:bg-gray-800"
                              >
                                {user.email}
                              </div>
                            </td>
                            <td className="px-4 py-4 text-sm whitespace-nowrap">
                              <div>
                                <h4 className="text-gray-700 dark:text-gray-200">
                                  {user.phone}
                                </h4>
                              </div>
                            </td>
                            <td className="px-12 py-4 text-sm font-medium whitespace-nowrap">
                              <div
                                className={`inline px-3 py-1 text-sm font-normal rounded-full ${
                                  user.isAdmin
                                    ? "text-emerald-500 bg-emerald-100/60"
                                    : "text-red-500 bg-red-100/60"
                                } gap-x-2 dark:bg-gray-800`}
                              >
                                {user.isAdmin ? "Admin" : "User"}
                              </div>
                            </td>
                            <td className="px-4 py-4 text-sm whitespace-nowrap">
                              <div className="flex items-center">
                                <button
                                  onClick={() => handleEdit(user._id)}
                                  className="ml-1 text-blue-500 hover:text-blue-700 bg-blue-100 px-2 py-1 rounded"
                                >
                                  <MdModeEdit />
                                </button>
                                <button
                                  onClick={() => handleDelete(user._id)}
                                  className="ml-1 text-red-500 hover:text-red-700 bg-red-100 px-2 py-1 rounded"
                                >
                                  <FaTrash />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={changePage}
          />
        </div>
      </section>
    </>
  );
}

export default AdminUsers;
