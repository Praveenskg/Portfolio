const Footer = () => {
  return (
    <>
      <footer className="bg-gray-900 text-white py-2  overflow-hidden border-t border-gray-800 fixed bottom-0 w-full ">
        <div className="text-center ">
          <p>
            &copy; {new Date().getFullYear()} Praveen Singh. All Rights
            Reserved.
          </p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
