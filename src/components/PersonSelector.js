import React from "react";

function PersonSelector({ currentPerson, setCurrentPerson }) {
  return (
    <div className="person-selector flex flex-wrap gap-2 m-4 items-center">
      <div className="flex items-center bg-neutral-900 p-1 rounded-lg w-full sm:w-[8vw] justify-center mb-2 sm:mb-0">
        <img
          src="https://img.icons8.com/?size=100&id=23493&format=png&color=000000"
          alt="person"
          className="h-8"
        />
        <p className="text-white font-semibold">Persons</p>
      </div>
      <button
        onClick={() => setCurrentPerson(1)}
        className={`px-8 border-2 border-green-500 py-2 rounded hover:scale-105 transition-all duration-150 w-full sm:w-auto ${
          currentPerson === 1
            ? "bg-green-300 font-semibold border-none"
            : "bg-white"
        }`}
      >
        Person 1
      </button>
      <button
        onClick={() => setCurrentPerson(2)}
        className={`px-8 border-2 border-green-500 py-2 rounded hover:scale-105 transition-all duration-150 w-full sm:w-auto ${
          currentPerson === 2
            ? "bg-green-300 font-semibold border-none"
            : "bg-white"
        }`}
      >
        Person 2
      </button>
    </div>
  );
}

export default PersonSelector;
