import { useAuth } from "../store/auth";

const Footer = () => {
  const { isDarkMode } = useAuth();
  const isAdminRoute = location.pathname.startsWith("/admin");
  return (
    <>
      {!isAdminRoute && (
        <footer
          className={` ${
            isDarkMode ? "text-white" : "bg-white text-black "
          }  py-2 font-bold w-full overflow-hidden border-t`}
        >
          <div className="text-center ">
            <p>
              &copy; {new Date().getFullYear()} Praveen Singh. All Rights
              Reserved.
            </p>
          </div>
        </footer>
      )}
    </>
  );
};

export default Footer;
