import Lottie from "lottie-react";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "./store/authSlice";
import animation from "../components/photos/loginanim.json";
import axios from "axios";
import toast from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showAnimation, setShowAnimation] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setShowAnimation(window.innerWidth > 768);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSignupClick = () => {
    navigate("/signup");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("All fields are required.");
      return;
    }

    try {
      const res = await axios.post(
        "https://allo-b.onrender.com/api/auth/login",
        {
          email,
          password,
        }
      );
      localStorage.setItem("token", res.data.token);
      dispatch(login());
      navigate("/");
    } catch (err) {
      console.error(err);
      toast.error("Invalid email or password. Please try again.");
    }
  };

  return (
    <div className="bg-green-500 min-h-screen w-full flex justify-center items-center p-4">
      <div className="bg-neutral-900 w-full max-w-4xl rounded-2xl flex flex-col md:flex-row overflow-hidden">
        {showAnimation && (
          <div className="h-64 md:h-auto md:w-1/2 bg-white border-black border-4 rounded">
            <Lottie animationData={animation} />
          </div>
        )}
        <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8">
          <h1 className="text-green-500 text-center m-3 text-3xl font-bold font-merienda">
            LOGIN
          </h1>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center w-full gap-6"
          >
            <div className="flex flex-col w-full max-w-xs">
              <label
                htmlFor="email"
                className="text-white text-xl font-semibold font-mono mb-2"
              >
                Email:
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
            <div className="flex flex-col w-full max-w-xs">
              <label
                htmlFor="password"
                className="text-white text-xl font-semibold font-mono mb-2"
              >
                Password:
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
            <button
              type="submit"
              className="text-white border-green-500 border-2 hover:scale-105 p-2 px-16 rounded hover:bg-green-500 hover:text-black transition-all duration-200 font-semibold mt-4"
            >
              Submit
            </button>
          </form>
          <div className="flex flex-col items-center w-full mt-8">
            <hr className="w-full max-w-xs border-gray-400" />
            <p className="text-gray-400 mt-4">
              New here?{" "}
              <span
                className="text-green-300 font-semibold underline hover:text-green-200 cursor-pointer"
                onClick={handleSignupClick}
              >
                Sign up!
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
