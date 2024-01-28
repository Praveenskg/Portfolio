import { useEffect, useState } from "react";
import Breadcrumb from "./Breadcrumb";
import { useAuth } from "../store/auth";

function Dashboard() {
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const { authorizationToken, API } = useAuth();

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
      console.log(users);
    } catch (error) {
      console.log(error);
    }
  };
  const getAllContactsData = async () => {
    try {
      const response = await fetch(`${API}/api/admin/contacts`, {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });
      const data = await response.json();
      setMessages(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllUsersData();
    getAllContactsData();
  }, []);
  return (
    <>
      <Breadcrumb />
      <div className="mx-3">
        <div className="max-h-96 overflow-y-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-900">
              <tr className="text-base text-center">
                <th className="sm:px-2 md:px-4 lg:px-6 py-3.5 text-left text-sm font-normal ">
                  <span>Name</span>
                </th>
                <th className="sm:px-2 md:px-4 lg:px-6 py-3.5 text-left text-sm font-normal ">
                  Email
                </th>
                <th className="sm:px-2 md:px-4 lg:px-6 py-3.5 text-left text-sm font-normal ">
                  Phone
                </th>
                <th className="sm:px-2 md:px-4 lg:px-6 py-3.5 text-left text-sm font-normal ">
                  Type
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {users.map((user, index) => (
                <tr key={index}>
                  <td className="whitespace-nowrap sm:px-2 md:px-4 lg:px-6 py-4">
                    {user.username}
                  </td>
                  <td className="whitespace-nowrap sm:px-2 md:px-4 lg:px-6 py-4">
                    {user.email}
                  </td>
                  <td className="whitespace-nowrap sm:px-2 md:px-4 lg:px-6 py-4">
                    {user.phone}
                  </td>
                  <td className="whitespace-nowrap sm:px-2 md:px-4 lg:px-6 py-4">
                    <span
                      className={`${
                        user.isAdmin
                          ? "rounded-full bg-green-100 px-2 text-xs font-semibold  text-green-800"
                          : "rounded-full bg-red-200 px-2 text-xs font-semibold  text-red-800"
                      }`}
                    >
                      {user.isAdmin ? "Admin" : "User"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
export default Dashboard;
