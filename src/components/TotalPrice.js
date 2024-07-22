// components/TotalPrice.js
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import waitress from "./photos/waitress.png";
import noorderanim from "./photos/noorederanim.json";
import Lottie from "lottie-react";
import orderconfirmed from "./photos/order-con.jpg";
import toast from "react-hot-toast";
import { deselectMeal } from "./store/mealsSlice";

function TotalPrice() {
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const selectedMealsPerson1 = useSelector(
    (state) => state.meals.selectedMealsPerson1
  );
  const selectedMealsPerson2 = useSelector(
    (state) => state.meals.selectedMealsPerson2
  );
  const meals = useSelector((state) => state.meals.meals);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const calculateTotal = (selectedMeals) => {
    return Object.entries(selectedMeals).reduce(
      (sum, [mealId, { drinkId }]) => {
        const meal = meals.find((m) => m.id === mealId);
        if (!meal) return sum;
        const drink = meal.drinks.find((d) => d.id === drinkId);
        return sum + meal.price + (drink ? drink.price : 0);
      },
      0
    );
  };

  const totalPerson1 = calculateTotal(selectedMealsPerson1);
  const totalPerson2 = calculateTotal(selectedMealsPerson2);

  const handleDeleteMeal = (person, mealId) => {
    dispatch(deselectMeal({ mealId, person }));
  };

  const renderMealDetails = (selectedMeals, person) => {
    const mealImageSrc =
      person === 1
        ? "https://img.icons8.com/?size=100&id=NTPjDyGAVp1r&format=png&color=40C057"
        : "https://img.icons8.com/?size=100&id=8439&format=png&color=40C057";
    const mealImageAlt = person === 1 ? "meal" : "meal2";

    return Object.entries(selectedMeals).map(([mealId, { drinkId }], index) => {
      const meal = meals.find((m) => m.id === mealId);
      const drink = meal.drinks.find((d) => d.id === drinkId);
      return (
        <li key={index} className="text-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 w-full">
              <img
                src={mealImageSrc}
                alt={mealImageAlt}
                className={person === 1 ? "h-11" : "h-10"}
              />
              <span className="font-bold">
                P{person} - {meal.title} - {drink ? drink.title : "No Drink"}
              </span>
            </div>
            <button
              onClick={() => handleDeleteMeal(person, mealId)}
              className="ml-2 p-1 bg-white hover:scale-115 hover:bg-green-200 rounded-full transition-colors duration-200"
            >
              <img
                src="https://img.icons8.com/?size=100&id=9deX0HJ5iAFS&format=png&color=40C057"
                alt="Delete"
                className="h-6 w-6 "
              />
            </button>
          </div>
          <hr className="border-green-800 mb-2" />
        </li>
      );
    });
  };

  const bothNoOrders =
    Object.keys(selectedMealsPerson1).length === 0 &&
    Object.keys(selectedMealsPerson2).length === 0;

  const handleCheckout = () => {
    if (!isAuthenticated) {
      navigate("/login");
    } else if (bothNoOrders) {
      toast.error("Order something first!");
    } else {
      setOrderConfirmed(true);
    }
  };

  return (
    <div className="total-price p-4 border-2 border-gray-50 rounded bg-white text-black shadow mt-4 lg:mt-0 lg:ml-4">
      <div className="flex items-center">
        <img src={waitress} alt="waitress" />
        <h2 className="text-center m-2 text-green-500 text-3xl font-bold">
          Your Orders
        </h2>
      </div>
      <p className="text-2xl font-semibold font-mono text-center">
        Person - Meal - Drink
      </p>
      <ul className="mt-4 mb-6 font-merienda text-center bg-green-200 p-2 rounded-md">
        {bothNoOrders ? (
          <div className="h-72 w-72 mx-auto">
            <Lottie animationData={noorderanim} />
          </div>
        ) : (
          <>
            {renderMealDetails(selectedMealsPerson1, 1)}
            {renderMealDetails(selectedMealsPerson2, 2)}
          </>
        )}
      </ul>
      <hr className="text-black border-black border-t-2 my-2" />
      <p className="text-center font-mono text-xl">
        Person-1 Total:
        <span className="font-bold text-green-500 ">
          ${totalPerson1.toFixed(2)}
        </span>
      </p>
      <p className="text-center font-mono text-xl">
        Person-2 Total:
        <span className="font-bold text-green-500">
          ${totalPerson2.toFixed(2)}
        </span>
      </p>
      <hr className="text-black border-black border-t-2 my-2" />
      <h3 className="text-lg font-bold mt-4 text-center">
        Total Price:{" "}
        <span className="text-yellow-400 text-2xl font-serif">
          ${(totalPerson1 + totalPerson2).toFixed(2)}
        </span>
      </h3>
      <div className="flex justify-center mt-4">
        {!isAuthenticated ? (
          <button
            onClick={() => navigate("/login")}
            className="text-green-500 font-bold text-xl border-2 border-green-500 p-2 px-14 hover:bg-green-500 hover:text-white transition-all duration-200 hover:scale-90"
          >
            Login to Checkout
          </button>
        ) : orderConfirmed ? (
          <div>
            <img src={orderconfirmed} alt="Order Confirmed" className="h-30" />
            <p className=" text-center text-green-500 font-merienda font-bold text-xl">
              Order will be delivered to your seat!
            </p>
          </div>
        ) : (
          <button
            onClick={handleCheckout}
            className="text-green-500 font-bold text-xl border-2 border-green-500 p-2 px-14 hover:bg-green-500 hover:text-white transition-all duration-200 hover:scale-90"
          >
            Checkout
          </button>
        )}
      </div>
    </div>
  );
}

export default TotalPrice;
