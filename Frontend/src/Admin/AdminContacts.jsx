import React, { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import { MdModeEdit } from "react-icons/md";
import { FaTrash } from "react-icons/fa6";
import { toast } from "react-toastify";

function AdminContacts() {
  const [contacts, setContacts] = useState([]);
  const { authorizationToken, user: isLoggedIn } = useAuth();

  const getAllContactsData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/admin/contacts", {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });
      const data = await response.json();
      setContacts(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllContactsData();
  }, []);

  const handleEdit = (contactId) => {
    // Placeholder: Implement your edit logic here
    console.log(`Edit contact with ID: ${contactId}`);
  };

  const handleDelete = async (contactId) => {
    try {
      // Placeholder: Implement your delete logic here

      // Example: disable delete for the logged-in user
      if (contactId === isLoggedIn._id) {
        toast.error("You cannot delete yourself!");
        return;
      }

      // Example: make a DELETE request to delete the contact
      const response = await fetch(
        `http://localhost:5000/api/admin/contacts/delete/${contactId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: authorizationToken,
          },
        }
      );

      const data = await response.json();
      if (response.ok) {
        getAllContactsData();
        toast.success(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex-1">
        <h2 className="text-center text-3xl">Admin Contact Data</h2>
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
              <th className="px-4 py-3.5 text-left text-sm font-normal ">
                Message
              </th>
              <th className="px-4 py-3.5 text-left text-sm font-normal ">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {contacts.map((user, index) => (
              <tr key={index}>
                <td className="whitespace-nowrap px-4 py-4">{user.username}</td>
                <td className="whitespace-nowrap px-12 py-4">{user.email}</td>
                <td className="whitespace-nowrap px-4 py-4">{user.phone}</td>
                <td className="whitespace-nowrap px-4 py-4">{user.message}</td>
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
    </>
  );
}

export default AdminContacts;
