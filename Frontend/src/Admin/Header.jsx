import Breadcrumb from "./Breadcrumb";

function Header() {
  return (
    <>
      <div className="sticky top-0 w-full  bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between  py-2 sm:px-6 lg:px-8">
          <Breadcrumb />
          <div className="inline-flex items-center space-x-2"></div>

          <div className="flex grow justify-end">
            <input
              className="flex h-10 w-[250px] rounded-md bg-gray-100 px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
              type="text"
              placeholder="Serach"
            />
          </div>
          <div className="ml-2 mt-2 hidden lg:block">
            <span className="relative inline-block">
              <img
                className="h-10 w-10 rounded-full"
                src="https://overreacted.io/static/profile-pic-c715447ce38098828758e525a1128b87.jpg"
                alt="Dan_Abromov"
              />
              <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-600 ring-2 ring-white" />
            </span>
          </div>
          <div className="ml-2 lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6 cursor-pointer"
            >
              <line x1={4} y1={12} x2={20} y2={12} />
              <line x1={4} y1={6} x2={20} y2={6} />
              <line x1={4} y1={18} x2={20} y2={18} />
            </svg>
          </div>
        </div>
      </div>
    </>
  );
}
export default Header;
