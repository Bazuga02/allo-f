// components/MealList.js
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import MealItem from "./MealItem";
import { selectMeal, deselectMeal } from "./store/mealsSlice";

function MealList() {
  const dispatch = useDispatch();
  const meals = useSelector((state) => state.meals.meals);
  const selectedMealsPerson1 = useSelector(
    (state) => state.meals.selectedMealsPerson1
  );
  const selectedMealsPerson2 = useSelector(
    (state) => state.meals.selectedMealsPerson2
  );
  const currentPerson = useSelector((state) => state.meals.currentPerson);
  const selectedLabels = useSelector((state) => state.meals.selectedLabels);

  const [currentPage, setCurrentPage] = useState(1);
  const mealsPerPage = 2;

  const filteredMeals = meals.filter(
    (meal) =>
      selectedLabels.length === 0 ||
      meal.labels.some((label) => selectedLabels.includes(label))
  );

  const numPages = Math.ceil(filteredMeals.length / mealsPerPage);

  useEffect(() => {
    if (currentPage > numPages) {
      setCurrentPage(1);
    }
  }, [filteredMeals, currentPage, numPages]);

  const indexOfLastMeal = currentPage * mealsPerPage;
  const indexOfFirstMeal = indexOfLastMeal - mealsPerPage;
  const currentMeals = filteredMeals.slice(indexOfFirstMeal, indexOfLastMeal);

  const handleSelect = (mealId, drinkId) => {
    dispatch(selectMeal({ mealId, drinkId, person: currentPerson }));
  };

  const handleDeselect = (mealId) => {
    dispatch(deselectMeal({ mealId, person: currentPerson }));
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const isSelected = (mealId) => {
    return currentPerson === 1
      ? selectedMealsPerson1.hasOwnProperty(mealId)
      : selectedMealsPerson2.hasOwnProperty(mealId);
  };

  return (
    <div className="meal-list">
      {currentMeals.map((meal) => (
        <div key={meal.id} className="w-full mb-4">
          <MealItem
            meal={meal}
            isSelected={isSelected(meal.id)}
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
          disabled={indexOfLastMeal >= filteredMeals.length}
          className={`px-4 py-2 mx-2 rounded ${
            indexOfLastMeal >= filteredMeals.length
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
