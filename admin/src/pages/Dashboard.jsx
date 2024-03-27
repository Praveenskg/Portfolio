import { ArticleFillIcon, PeoplesIcon, UserPlusIcon } from "../assets/icons";
const Dashboard = () => {
  return (
    <>
      <section className="mt-5">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 ">
          <div className="rounded-md bg-orange-500 text-white shadow dark:bg-orange-600">
            <div className="flex items-center gap-4 p-4">
              <PeoplesIcon className="text-5xl" />
              <div>
                <h1 className="text-xl font-bold">Daily Visitors</h1>
                <p>12345</p>
              </div>
            </div>
            <div className="h-[90px] w-full"></div>
          </div>
          <div className="rounded-md bg-zinc-500 text-white shadow dark:bg-zinc-600">
            <div className="flex items-center gap-4 p-4">
              <UserPlusIcon className="text-5xl" />
              <div>
                <h1 className="text-xl font-bold">New Users</h1>
                <p>12345</p>
              </div>
            </div>
            <div className="h-[90px] w-full"></div>
          </div>
          <div className="rounded-md bg-purple-500 text-white shadow dark:bg-purple-600">
            <div className="flex items-center gap-4 p-4">
              <ArticleFillIcon className="text-5xl" />
              <div>
                <h1 className="text-xl font-bold">Article Published</h1>
                <p>12345</p>
              </div>
            </div>
            <div className="h-[90px] w-full"></div>
          </div>
        </div>
      </section>

      <section>Another section</section>
    </>
  );
};
export default Dashboard;
