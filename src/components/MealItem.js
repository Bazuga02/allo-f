import React, { useState } from "react";
import DrinkSelector from "./DrinkSelector";

function MealItem({ meal, onSelect, onDeselect, isSelected }) {
  const [imageError, setImageError] = useState(false);
  const [selectedDrink, setSelectedDrink] = useState("");

  const handleImageError = () => {
    setImageError(true);
  };

  const handleSelect = (drinkId) => {
    setSelectedDrink(drinkId);
    onSelect(drinkId);
  };

  return (
    <div className="meal-item p-4 border rounded shadow mb-4">
      <img
        src={
          imageError
            ? "https://via.placeholder.com/200x150?text=Meal+Image"
            : meal.img
        }
        alt={meal.title}
        className="w-full md:w-[40%] object-cover mb-4 mx-auto rounded"
        onError={handleImageError}
      />
      <h3 className="text-lg font-bold text-center">{meal.title}</h3>
      <p className="font-mono font-semibold">Starter: {meal.starter}</p>
      <p className="font-mono">Dessert: {meal.desert}</p>
      <p className="font-mono mb-2">Description: {meal.description}</p>
      <p className="text-green-500 font-semibold text-xl text-center">
        Price: ${meal.price.toFixed(2)}
      </p>
      <DrinkSelector drinks={meal.drinks} onSelect={handleSelect} />
      <div className="flex justify-center mt-2">
        <button
          onClick={isSelected ? onDeselect : () => onSelect(selectedDrink)}
          className={`px-4 py-2 m-3 w-full md:w-[80%] rounded ${
            isSelected
              ? "bg-white text-red-500 border border-red-500 hover:bg-red-500 hover:text-white"
              : "bg-green-500 text-white border-2 border-green-500 hover:bg-green-600 hover:border-green-600"
          }`}
        >
          {isSelected ? "Remove" : "Select"}
        </button>
      </div>
    </div>
  );
}

export default MealItem;
