import { useState } from "react";
import { useNavigate } from "react-router-dom";
import google from "../../../assets/icons/google.svg";
import bgImage from "../../../assets/img/bg-image.jpg";
import SignupModal from "./components/SignupModal";
import Overlay from "./components/Overlay";
import GoogleLoginComponent from "./components/GoogleLoginComponent";


const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const navigate = useNavigate();

  const toggleSignupModal = () => {
    setIsSignupModalOpen(!isSignupModalOpen);
  };

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      if (response.ok) {
        navigate("main");
      } else {
        setError("Invalid username or password");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("An error occurred while logging in");
    }
  };
  
  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="relative flex flex-col md:flex-row m-6 space-y-10 rounded-2xl bg-mainBlack bg-opacity-70">
        <div className="p-8 md:p-20 flex flex-col justify-center">
          <h2 className="font-semibold text-lg text-white py-4">
            Log in to your account
          </h2>
          <div className="flex justify-center">
            <a href="http://localhost:3000/auth/google" className="flex text-xs font-medium text-white items-center justify-center bg-customLightBlue hover:bg-customBlue active:bg-customLightBlue w-full py-2 rounded transition duration-200">
              <img className="w-6 mx-3 bg-white rounded-full" src={google} />
              Log in with Google
            </a>
          </div>
          <div className="inline-flex items-center justify-center py-2">
            <hr className="w-64 h-px my-8 border-0 bg-gray-700" />
            <span
              className="absolute px-3 font-medium  text-white bg-mainBlack rounded"
              style={{ left: "50%", transform: "translateX(-50%)" }}
            >
              or
            </span>
          </div>
          <div className="flex flex-col space-y-3">
            <input
              type="text"
              className="rounded pl-3 py-2 bg-mainBlack border border-gray-700 text-sm text-white focus:outline-none focus:ring-2 focus:ring-gray-700"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              className="rounded pl-3 py-2 bg-mainBlack border border-gray-700 text-sm text-white focus:outline-none focus:ring-2 focus:ring-gray-700"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              className="bg-white hover:bg-gray-500 active:bg-white font-medium text-mainBlack text-xs py-3 rounded transition duration-200"
              onClick={handleLogin}
            >
              Continue
            </button>
          </div>
          <span className="pt-2 text-red-500 h-4">{error}</span>
          <span
            className="pt-12 text-white text-sm"
            onClick={toggleSignupModal}
          >
            Don't have an account? Sign up
          </span>
        </div>
      </div>
      {isSignupModalOpen && (
        <>
          <Overlay onClose={toggleSignupModal} isOpen={isSignupModalOpen} />
          <SignupModal onClose={toggleSignupModal} isOpen={false} />
        </>
      )}
    </div>
  );
};

export default Login;
