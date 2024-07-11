import React from "react";
import wine from "./photos/drink-1.png";
import juice from "./photos/drink-2.png";
import beer from "./photos/drink-3.png";

function DrinkSelector({ drinks, onSelect }) {
  const getImageByTitle = (title) => {
    switch (title.toLowerCase()) {
      case "wine":
        return wine;
      case "juice":
        return juice;
      case "beer":
        return beer;
      default:
        return wine; // Default to wine image if title doesn't match
    }
  };

  return (
    <div className="flex flex-wrap items-center mt-2 gap-2 sm:gap-4 md:gap-6 w-full justify-center sm:justify-between bg-slate-200 p-1 rounded-lg">
      {drinks.map((drink) => (
        <div 
          key={drink.id} 
          className="flex items-center gap-2 cursor-pointer transition-all duration-150 hover:bg-gray-300 p-2 rounded-lg w-full sm:w-auto"
          onClick={() => onSelect(drink.id)}
        >
          <img
            src={getImageByTitle(drink.title)}
            alt={drink.title}
            className="h-12 sm:h-16 md:h-20 transition-all duration-200 hover:scale-125"
          />
          <div>
            <p className="font-semibold text-sm sm:text-base">{drink.title}</p>
            <p className="font-bold text-green-700 text-sm sm:text-base">${drink.price.toFixed(2)}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default DrinkSelector;