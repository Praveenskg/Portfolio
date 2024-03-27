import React, { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import { MdModeEdit } from "react-icons/md";
import { FaTrash, FaRegEye } from "react-icons/fa";
import { toast } from "react-toastify";
import Pagination from "./Pagination";
import { useParams } from "react-router-dom";

function AdminContacts() {
  const [contacts, setContacts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const itemsPerPage = 10;
  const params = useParams();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { authorizationToken, user: isLoggedIn, API } = useAuth();

  const getAllContactsData = async () => {
    try {
      const response = await fetch(`${API}/api/admin/contacts`, {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });
      const data = await response.json();
      setContacts(data.reverse());
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const getSingleUser = async (id) => {
    try {
      const response = await fetch(`${API}/api/admin/contacts/${id}`, {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });
      if (!response.ok) {
        throw new Error(
          `Failed to fetch user data: ${response.status} ${response.statusText}`
        );
      }
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    getAllContactsData();
  }, [authorizationToken, params.id]);

  const openProfile = async (id) => {
    try {
      await getSingleUser(id);
      setIsProfileOpen(true);
    } catch (error) {
      console.error("Error opening profile:", error);
    }
  };

  const closeProfile = () => {
    setIsProfileOpen(false);
  };

  const handleEdit = (contactId) => {
    console.log(`Edit contact with ID: ${contactId}`);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${API}/api/admin/contacts/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: authorizationToken,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Failed to delete contact: ${errorData.message}`);
      }

      // Assuming your server returns the deleted contact or identifier, you can use it to update the UI.
      const deletedContact = await response.json();

      // Update your local state or UI based on the deleted contact information.

      toast.success("Contact deleted successfully");
    } catch (error) {
      console.log("Error deleting contact:", error.message);
      // Handle the error, you might want to show a toast or other error message to the user.
    }
  };

  const changePage = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const totalPages = Math.ceil(contacts.length / itemsPerPage);

  return (
    <>
      <div className="">
        <h2 className="text-center text-3xl">Admin Contact Data</h2>
      </div>
      <section className="container px-4 mx-auto bg-gray-900">
        <div className="flex flex-col mt-2">
          {loading ? (
            // Display a loading screen while data is being fetched
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
                          Message
                        </th>{" "}
                        <th
                          scope="col"
                          className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                        >
                          Date
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
                      {contacts
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
                            <td className="px-4 py-4 text-sm whitespace-nowrap">
                              <div className="flex items-center">
                                {user.message.length > 50
                                  ? `${user.message.substring(0, 50)}...`
                                  : user.message}
                              </div>
                            </td>
                            <td className="px-4 py-4 text-sm whitespace-nowrap">
                              <div className="flex items-center">
                                {/* Displaying the createdAt field */}
                                {user.createdAt}
                              </div>
                            </td>
                            <td className="px-4 py-4 text-sm whitespace-nowrap">
                              <div className="flex items-center">
                                <button
                                  onClick={() => openProfile(user._id)}
                                  className="text-blue-500 hover:text-blue-700 bg-blue-100 px-2 py-1 rounded"
                                >
                                  <FaRegEye />
                                </button>
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
          {isProfileOpen && (
            <div className="fixed inset-0 z-10 overflow-y-auto">
              <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 transition-opacity">
                  <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
                &#8203;
                <div
                  className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby="modal-headline"
                >
                  <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <h3
                          className="text-lg leading-6 font-medium text-gray-900"
                          id="modal-headline"
                        >
                          {data.username}'s Query
                        </h3>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">
                            Email- {data.email}
                          </p>
                          <p className="text-sm text-gray-500">
                            Phone-{data.phone}
                          </p>
                          <p className="text-sm text-gray-500">
                            Message- {data.message}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    <button
                      onClick={closeProfile}
                      type="button"
                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default AdminContacts;
