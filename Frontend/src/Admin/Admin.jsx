import { Outlet } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";
function Admin() {
  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-800 font-roboto">
      <AdminNavbar />
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
}

export default Admin;
