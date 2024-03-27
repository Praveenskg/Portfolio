import { Outlet } from "react-router-dom";
import AdminNavbar from "./AdminNavbar";
import Breadcrumb from "./Breadcrumb";
import Header from "./Header";
function Admin() {
  return (
    <div className="flex h-screen font-roboto">
      <AdminNavbar />
      <div className="flex-1 overflow-y-auto bg-gray-200">
        <Header />
        <Outlet />
      </div>
    </div>
  );
}

export default Admin;
