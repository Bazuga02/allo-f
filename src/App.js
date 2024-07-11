import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MealList from "./components/MealList";
import TagFilter from "./components/TagFilter";
import PersonSelector from "./components/PersonSelector";
import TotalPrice from "./components/TotalPrice";
import { getMeals, getLabels } from "./services/api";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Lottie from "lottie-react";
import animation from "../src/components/photos/Animation.json";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { Toaster } from "react-hot-toast";

function App() {
  const [meals, setMeals] = useState([]);
  const [labels, setLabels] = useState([]);
  const [selectedLabels, setSelectedLabels] = useState([]);
  const [selectedMealsPerson1, setSelectedMealsPerson1] = useState({});
  const [selectedMealsPerson2, setSelectedMealsPerson2] = useState({});
  const [currentPerson, setCurrentPerson] = useState(1);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    getMeals().then(setMeals);
    getLabels().then(setLabels);
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    // Clear the selected meals when logging out
    setSelectedMealsPerson1({});
    setSelectedMealsPerson2({});
  };

  const filteredMeals = meals.filter(
    (meal) =>
      selectedLabels.length === 0 ||
      meal.labels.some((label) => selectedLabels.includes(label))
  );

  const selectedMeals =
    currentPerson === 1 ? selectedMealsPerson1 : selectedMealsPerson2;
  const setSelectedMeals =
    currentPerson === 1 ? setSelectedMealsPerson1 : setSelectedMealsPerson2;

  return (
    <>
      <Toaster />
      <Router>
        <div className="App flex flex-col items-center w-full mx-auto">
          <Header isAuthenticated={isAuthenticated} onLogout={handleLogout} />
          <div className="w-11/12 mx-auto flex-grow">
            <Routes>
              <Route
                path="/login"
                element={<Login setIsAuthenticated={setIsAuthenticated} />}
              />
              <Route
                path="/signup"
                element={<Signup setIsAuthenticated={setIsAuthenticated} />}
              />
              <Route
                path="/"
                element={
                  <>
                    <PersonSelector
                      currentPerson={currentPerson}
                      setCurrentPerson={setCurrentPerson}
                    />
                    <TagFilter
                      labels={labels}
                      selectedLabels={selectedLabels}
                      setSelectedLabels={setSelectedLabels}
                    />
                    <div className="w-full mt-4 mx-auto">
                      <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="text-3xl font-semibold mb-4 text-green-500 font-mono flex items-center">
                          <div className="h-20 w-20">
                            <Lottie animationData={animation} />
                          </div>
                          <span className="ml-2 font-merienda-900">
                            Select Meals
                          </span>
                        </div>
                        <div className="text-3xl font-semibold mb-4 font-mono underline hidden lg:block">
                          Order Summary
                        </div>
                      </div>
                      <div className="flex flex-col md:flex-row justify-between mb-3">
                        <div className="w-full md:w-3/5">
                          <MealList
                            meals={filteredMeals}
                            selectedMeals={selectedMeals}
                            setSelectedMeals={setSelectedMeals}
                            currentPerson={currentPerson}
                          />
                        </div>
                        <div className="w-full md:w-2/5 text-white bg-green-500 p-4 mt-4 md:mt-0">
                          <TotalPrice
                            selectedMealsPerson1={selectedMealsPerson1}
                            selectedMealsPerson2={selectedMealsPerson2}
                            setSelectedMealsPerson1={setSelectedMealsPerson1}
                            setSelectedMealsPerson2={setSelectedMealsPerson2}
                            meals={meals}
                            isAuthenticated={isAuthenticated}
                          />
                        </div>
                      </div>
                    </div>
                  </>
                }
              />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </>
  );
}

export default App;
