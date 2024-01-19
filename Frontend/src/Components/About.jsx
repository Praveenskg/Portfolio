import React from "react";
import AboutImg from "../assets/about-img.png";
import "animate.css";

const About = () => {
  return (
    <section
      className=" dark:bg-gray-800 text-white px-5 py-32 animate__animated animate__fadeIn capitalize"
      id="about"
    >
      <div className="container mx-auto grid md:grid-cols-2 items-center justify-center md:justify-between">
        <div className="about-info">
          <h2 className="text-3xl font-bold mb-5 border-b-[5px] w-[180px] border-indigo-600 pb-2">
            About Me
          </h2>

          <p className="pb-5">
            Hi, My Name Is Praveen Singh, I am a Frontend Developer. I build
            beautiful websites with React and Tailwind CSS.
          </p>
          <p className="pb-5">
            I am proficient in Frontend skills like React.js, Redux, Redux Tool
            Kit, Axios, Tailwind CSS and many more.
          </p>

          <p>In backend I know Node.js, Express.js, MongoDB, and Mongoose</p>
        </div>
        <div className="about-img">
          <img
            src={AboutImg}
            alt="coding illustration"
            className="lgw-[80%] ml-auto"
          />
        </div>
      </div>
    </section>
  );
};

export default About;
