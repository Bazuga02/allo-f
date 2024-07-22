import Lottie from "lottie-react";
import React from "react";
import ani1 from "./photos/home1.json";

const Home = ({ onOrderNowClick }) => {
  return (
    <div className="h-[80vh] w-full bg-green-500 rounded-lg flex items-center justify-center p-2">
      <div>
        <Lottie animationData={ani1} />
      </div>
      <h1 className="flex flex-col gap-5 items-center text-5xl text-center font-merienda font-bold border-white border-4 py-6 p-3 leading-relaxed">
        "Allo Meals: Bringing Gourmet Delights Right to Your Seat, One
        Irresistible Bite at a Time!"
        <button
          onClick={onOrderNowClick}
          className="bg-black w-[30%] text-3xl hover:text-black hover:scale-110 transition-all duration-200 hover:bg-green-500 border-2 border-black p-1 font-mono text-green-500"
        >
          Order Now
        </button>
      </h1>
    </div>
  );
};

export default Home;
