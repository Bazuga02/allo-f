import React from "react";
import logo from "./logo.svg";

const Footer = () => {
  return (
    <div className="bg-neutral-900 flex items-center justify-center w-full h-16  pt-1">
      <img src={logo} alt="logo" className=" h-5" />

      <div className="  w-full h-full text-white text-center ">
        All Rights reserved
        <a
          className=" text-blue-400 hover:text-blue-500"
          href="https://abhirai-portfolio.netlify.app/"
          target="_blank"
          rel="noreferrer"
        >
          {" "}
          @ABHISHEK
        </a>
      </div>
      <img src={logo} alt="logo" className=" h-5" />
    </div>
  );
};

export default Footer;
