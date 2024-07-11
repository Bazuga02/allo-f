import React, { useState, useEffect } from "react";
import MealItem from "./MealItem";

function MealList({ meals, selectedMeals, setSelectedMeals, currentPerson }) {
  const [currentPage, setCurrentPage] = useState(1);
  const mealsPerPage = 2;

  // Calculate number of pages based on current filtered meals
  const numPages = Math.ceil(meals.length / mealsPerPage);

  // Reset to first page when items decrease due to filters
  useEffect(() => {
    if (currentPage > numPages) {
      setCurrentPage(1);
    }
  }, [meals, currentPage, numPages]);

  const indexOfLastMeal = currentPage * mealsPerPage;
  const indexOfFirstMeal = indexOfLastMeal - mealsPerPage;
  const currentMeals = meals.slice(indexOfFirstMeal, indexOfLastMeal);

  const handleSelect = (mealId, drinkId) => {
    setSelectedMeals((prevSelected) => ({
      ...prevSelected,
      [mealId]: { drinkId, person: currentPerson },
    }));
  };

  const handleDeselect = (mealId) => {
    setSelectedMeals((prevSelected) => {
      const updatedSelected = { ...prevSelected };
      delete updatedSelected[mealId];
      return updatedSelected;
    });
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="meal-list">
      {currentMeals.map((meal) => (
        <div key={meal.id} className="w-full mb-4">
          <MealItem
            meal={meal}
            isSelected={selectedMeals.hasOwnProperty(meal.id)}
            onSelect={(drinkId) => handleSelect(meal.id, drinkId)}
            onDeselect={() => handleDeselect(meal.id)}
          />
        </div>
      ))}
      <div className="flex justify-center mt-4">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-4 py-2 mx-2 rounded ${
            currentPage === 1
              ? "bg-gray-300 text-gray-700 cursor-default"
              : "bg-gray-400 text-gray-900 hover:bg-gray-500"
          }`}
        >
          Previous
        </button>
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={indexOfLastMeal >= meals.length}
          className={`px-4 py-2 mx-2 rounded ${
            indexOfLastMeal >= meals.length
              ? "bg-gray-300 text-gray-700 cursor-default"
              : "bg-gray-400 text-gray-900 hover:bg-gray-500"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default MealList;
