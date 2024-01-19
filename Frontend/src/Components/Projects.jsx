import project1 from "../assets/project1.png";
import project2 from "../assets/project2.png";
import project3 from "../assets/project3.png";

const Projects = () => {
  const projects = [
    {
      img: project1,
      title: "Image Search",
      desc: " A Image Search App . Built with  React, Redux and Tailwind CSS ",
      live: "https://image-search-praveen.vercel.app/",
      code: "https://github.com/Praveenskg/Image",
    },
    {
      img: project2,
      title: "QR-Code Generator",
      desc: "A QR-Code Generator App . Built with  React, Redux and Tailwind CSS  with light and dark theme",
      live: "https://qr-generator-praveen.vercel.app",
      code: "https://github.com/Praveenskg/Qr-generator",
    },
    {
      img: project3,
      title: "Weather Web",
      desc: "A Weather Web App. Built with React And CSS And Weather API ",
      live: "https://praveenskg.github.io/Weather/",
      code: "https://github.com/Praveenskg/Weather",
    },
  ];

  return (
    <section className="bg-primary text-white px-5 py-32" id="projects">
      <div className="container mx-auto grid md:grid-cols-2 items-center md:justify-between capitalize">
        <div className="about-info mb-5">
          <h2 className="text-3xl font-bold mb-5 border-b-[5px] w-[180px] border-indigo-600 pb-2">
            Projects
          </h2>

          <p className="pb-5">
            These are some of my best projects. I have built these with React,
            MERN and Tailwind CSS. Check them out.
          </p>
        </div>

        <div className="about-img"></div>
      </div>

      <div className="projects container mx-auto grid md:grid-cols-3 gap-10">
        {projects.map((project, i) => {
          return (
            <div className="relative" key={i}>
              <img src={project.img} alt={project.title} />
              <div className="flex absolute left-0 right-0 top-[13px] bottom-0 mx-auto w-[90%] h-[90%]  bg-primary  opacity-0 duration-500 justify-center flex-col hover:opacity-100 ">
                <p className="py-5 text-center font-bold px-2 text-black capitalize">
                  {project.desc}
                </p>

                <div className="mx-auto">
                  <a
                    href={project.live}
                    className="px-5 py-2 bg-blue-500 hover:bg-blue-600 mr-5 font-bold"
                  >
                    Live
                  </a>
                  <a
                    href={project.code}
                    className="px-5 py-2 bg-blue-700 hover:bg-blue-800 font-bold"
                  >
                    Code
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Projects;
