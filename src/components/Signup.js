import Lottie from "lottie-react";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import animation from "../components/photos/signupanim.json";
import axios from "axios";
import toast from "react-hot-toast";

const Signup = ({ setIsAuthenticated }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [seatNumber, setSeatNumber] = useState("");
  const [showAnimation, setShowAnimation] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setShowAnimation(window.innerWidth > 768);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLoginClick = () => {
    navigate("/login");
  };

  const validateForm = () => {
    if (!username || !email || !password || !seatNumber) {
      toast.error("All fields are required");
      return false;
    }
    if (username.length < 4) {
      toast.error("Username must be at least 4 characters long");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error("Please enter a valid email address");
      return false;
    }
    if (password.length < 4) {
      toast.error("Password must be at least 4 characters long");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const res = await axios.post(
        "https://allo-b.onrender.com/api/auth/signup",
        {
          username,
          email,
          password,
          seatNumber,
        }
      );
      localStorage.setItem("token", res.data.token);
      setIsAuthenticated(true);
      toast.success("Signup successful!");
      navigate("/");
    } catch (err) {
      console.error(err);
      toast.error("Signup failed. Please try again.");
    }
  };

  return (
    <div className="bg-green-500 min-h-screen w-full flex justify-center items-center p-4">
      <div className="bg-neutral-900 w-full max-w-4xl rounded-2xl flex flex-col md:flex-row overflow-hidden">
        {showAnimation && (
          <div className="h-64 md:h-auto md:w-1/2 bg-white border-black border-4 rounded flex items-center justify-center">
            <Lottie animationData={animation} />
          </div>
        )}
        <div className="w-full md:w-1/2 flex flex-col p-8">
          <h1 className="text-green-500 text-center mb-6 text-3xl font-bold font-merienda">
            SIGN UP
          </h1>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center gap-4 w-full"
          >
            <div className="flex flex-col items-center w-full">
              <label
                htmlFor="username"
                className="text-white text-xl font-semibold font-mono mb-1 w-full"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                placeholder="username"
                className="p-2 rounded bg-gray-200 w-full"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="flex flex-col items-center w-full">
              <label
                htmlFor="email"
                className="text-white text-xl font-semibold font-mono mb-1 w-full"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="email"
                className="p-2 rounded-md bg-gray-200 w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex flex-col items-center w-full">
              <label
                htmlFor="password"
                className="text-white text-xl font-semibold font-mono mb-1 w-full"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="password"
                className="p-2 rounded-md bg-gray-200 w-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex flex-col items-center w-full">
              <label
                htmlFor="seatNumber"
                className="text-white text-xl font-semibold font-mono mb-1 w-full"
              >
                Seat Number
              </label>
              <input
                type="text"
                id="seatNumber"
                placeholder="seat number"
                className="p-2 rounded-md bg-gray-200 w-full"
                value={seatNumber}
                onChange={(e) => setSeatNumber(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="text-white border-green-500 border-2 hover:scale-105 p-2 px-16 rounded hover:bg-green-500 hover:text-black transition-all duration-200 font-semibold mt-4"
            >
              Submit
            </button>
          </form>
          <div className="flex flex-col items-center w-full mt-6">
            <hr className="w-full border-gray-400" />
            <p className="text-gray-400 mt-4">
              Already a user?{" "}
              <span
                className="text-green-300 font-semibold underline hover:text-green-200 cursor-pointer"
                onClick={handleLoginClick}
              >
                Login here
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
