import { Outlet } from "react-router-dom";
import { Navbar, Sidebar, BreadCrumb } from "../Components";
import LeftSidebar from "../Components/LeftSidebar";

const RootLayout = () => {
  return (
    <div className="relative">
      <LeftSidebar />
      <Sidebar />
      <div className="xl:absolute xl:left-[300px] xl:right-0">
        <div className="relative">
          <Navbar />
          <div className="h-[65px]"></div>
          <BreadCrumb />
          <div className=" max-w-[1400px] px-4 xl:px-5">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};
export default RootLayout;
