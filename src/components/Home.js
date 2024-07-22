import Lottie from "lottie-react";
import React from "react";
import ani1 from "./photos/home1.json";

const Home = ({ onOrderNowClick }) => {
  return (
    <div className="h-auto md:h-[80vh] w-full bg-green-500 rounded-lg flex flex-col md:flex-row items-center justify-center p-4 md:p-8">
      <div className="w-full md:w-1/2 flex justify-center mb-4 md:mb-0">
        <Lottie animationData={ani1} className="w-full max-w-md" />
      </div>
      <div className="w-full md:w-1/2 flex flex-col items-center text-center">
        <h1 className="text-3xl md:text-5xl font-merienda font-bold border-white border-4 py-4 px-6 leading-relaxed mb-4 md:mb-6">
          "Allo Meals: Bringing Gourmet Delights Right to Your Seat, One
          Irresistible Bite at a Time!"
        </h1>
        <button
          onClick={onOrderNowClick}
          className="bg-black text-2xl md:text-3xl text-green-500 hover:text-black hover:bg-green-500 border-2 border-black py-2 px-4 md:py-3 md:px-6 font-mono hover:scale-110 transition-all duration-200"
        >
          Order Now
        </button>
      </div>
    </div>
  );
};

export default Home;
