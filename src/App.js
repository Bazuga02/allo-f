import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchMeals, fetchLabels } from "./components/store/mealsSlice";
import Header from "./components/Header";
import MealList from "./components/MealList";
import PersonSelector from "./components/PersonSelector";
import TagFilter from "./components/TagFilter";
import TotalPrice from "./components/TotalPrice";
import LoginPage from "./components/Login";
import SignupPage from "./components/Signup";
import { Toaster } from "react-hot-toast";
import { login } from "./components/store/authSlice";
import Lottie from "lottie-react";
import animation from "../src/components/photos/Animation.json";
import Footer from "./components/Footer";
import Home from "./components/Home";

function App() {
  const dispatch = useDispatch();
  const [showHome, setShowHome] = useState(true);

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (isAuthenticated) {
      dispatch(login());
    }
    dispatch(fetchMeals());
    dispatch(fetchLabels());
  }, [dispatch]);

  const handleOrderNowClick = () => {
    setShowHome(false);
  };

  return (
    <Router>
      <div className="App bg-gray-100 min-h-screen">
        <Toaster position="top-center" reverseOrder={false} />
        <Header />
        {showHome ? (
          <div className="container mx-auto p-4">
            <Home onOrderNowClick={handleOrderNowClick} />
          </div>
        ) : (
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route
              path="/"
              element={
                <div className="container mx-auto p-4">
                  <PersonSelector />
                  <TagFilter />
                  <div className="flex flex-col lg:flex-row">
                    <div className="lg:w-2/3">
                      <div className="text-3xl font-semibold mb-4 text-green-500 font-mono flex items-center">
                        <div className="h-20 w-20">
                          <Lottie animationData={animation} />
                        </div>
                        <span className="ml-2 font-merienda-900">
                          Select Meals
                        </span>
                      </div>
                      <MealList />
                    </div>
                    <div className="lg:w-1/3">
                      <div className="text-3xl font-semibold mb-4 font-mono underline hidden lg:block">
                        Order Summary
                      </div>
                      <TotalPrice />
                    </div>
                  </div>
                </div>
              }
            />
          </Routes>
        )}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
