import { useEffect, useState } from "react";
import { useAuth } from "../store/auth";

function Dashboard() {
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const { authorizationToken, API, isDarkMode } = useAuth();
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
      <section
        className={`px-4 mx-auto max-w-full ${
          isDarkMode ? "bg-gray-800 text-white " : "bg-gray-100  text-black"
        }`}
      >
        <h2
          className={`text-lg font-medium ${
            isDarkMode ? "text-white" : "text-gray-800"
          }`}
        >
          Users
        </h2>
        <div className="flex flex-col mt-2 ">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div
                className={`overflow-hidden border border-gray-200 ${
                  isDarkMode ? "dark:border-gray-700" : ""
                } md:rounded-lg`}
              >
                <table
                  className={`min-w-full divide-y divide-gray-200 ${
                    isDarkMode ? "divide-gray-700" : ""
                  }`}
                >
                  <thead
                    className={` ${
                      isDarkMode ? "bg-gray-700" : " bg-gray-200"
                    }`}
                  >
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 px-8 text-sm font-normal text-left"
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        className="py-3.5 px-12 text-sm font-normal text-left"
                      >
                        Type
                      </th>
                      <th
                        scope="col"
                        className="py-3.5 px-4 text-sm font-normal text-left"
                      >
                        Phone
                      </th>
                      <th
                        scope="col"
                        className="py-3.5 px-4 text-sm font-normal text-left"
                      >
                        Email
                      </th>
                    </tr>
                  </thead>
                  <tbody
                    className={` divide-y divide-gray-200 ${
                      isDarkMode ? "divide-gray-700" : ""
                    }`}
                  >
                    {users.slice(0, 5).map((user, index) => (
                      <tr key={index}>
                        <td className="px-4 py-4 text-sm font-medium whitespace-nowrap ">
                          <div>
                            <h2>{user.username}</h2>
                          </div>
                        </td>
                        <td className="px-12 py-4 text-sm font-medium whitespace-nowrap">
                          <div
                            className={`inline px-3 py-1 text-sm font-normal rounded-full ${
                              user.isAdmin
                                ? "text-emerald-500 bg-emerald-100/60"
                                : "text-red-500 bg-red-100/60"
                            } gap-x-2 ${
                              isDarkMode ? "bg-gray-50" : "bg-gray-300"
                            }`}
                          >
                            {user.isAdmin ? "Admin" : "User"}
                          </div>
                        </td>
                        <td className="px-4 py-4 text-sm whitespace-nowrap">
                          <div>
                            <h4>{user.phone}</h4>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-sm whitespace-nowrap">
                          <a href={`mailto:${user.email}`}>{user.email}</a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <hr className="mt-3" />
        <h2
          className={`text-lg font-medium ${
            isDarkMode ? "text-white" : "text-gray-800"
          }`}
        >
          Contacts
        </h2>
        <div className="flex flex-col mt-2">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div
                className={`overflow-hidden border border-gray-200 ${
                  isDarkMode ? "dark:border-gray-700" : ""
                } md:rounded-lg`}
              >
                <table
                  className={`min-w-full divide-y divide-gray-200 ${
                    isDarkMode ? "divide-gray-700" : ""
                  }`}
                >
                  <thead
                    className={` ${
                      isDarkMode ? "bg-gray-700" : " bg-gray-200"
                    }`}
                  >
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 px-8 text-sm font-normal text-left"
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        className="py-3.5 px-20  text-sm font-normal text-left"
                      >
                        Email
                      </th>
                      <th
                        scope="col"
                        className="py-3.5 px-8 text-sm font-normal text-left"
                      >
                        Phone
                      </th>
                      <th
                        scope="col"
                        className="py-3.5 px-8 text-sm font-normal text-left"
                      >
                        Message
                      </th>
                    </tr>
                  </thead>
                  <tbody
                    className={` divide-y divide-gray-200 ${
                      isDarkMode ? "dark:divide-gray-700" : ""
                    }`}
                  >
                    {messages.slice(0, 10).map((user, index) => (
                      <tr key={index}>
                        <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                          <div>{user.username}</div>
                        </td>
                        <td className="px-12 py-4 text-sm font-medium whitespace-nowrap">
                          <div
                            className={`inline px-3 py-1 text-sm font-normal rounded-full gap-x-2 text-emerald-500 bg-emerald-100/60 
                              ${isDarkMode ? "bg-gray-50" : "bg-gray-100"}`}
                          >
                            <a href={`mailto:${user.email}`}>{user.email}</a>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-sm whitespace-nowrap">
                          <div>
                            <a href={`tel:+91${user.phone}`}>{user.phone}</a>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-sm whitespace-nowrap">
                          <div className="flex items-center">
                            {user.message.length > 50
                              ? `${user.message.substring(0, 50)}...`
                              : user.message}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
export default Dashboard;
