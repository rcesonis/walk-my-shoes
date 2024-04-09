import google from '../../../assets/icons/google.svg';
import closeIcon from '../../../assets/icons/close.svg'
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

type Props = {
  onClose: () => void;
  isOpen: boolean;
};

const SignupModal: React.FC<Props> = ({ onClose }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });
      if (response.ok) {
        navigate("main");
      } else {
        const responseData = await response.json();
        setError(responseData.message || "An error occurred while signing up");
      }
    } catch (error) {
      console.error("Signup error:", error);
      setError("An error occurred while signing up");
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
      <div className="relative flex flex-col md:flex-row m-6 space-y-10 rounded-2xl bg-mainBlack bg-opacity-70">
        <div className="p-8 md:p-20 flex flex-col justify-center">
        <button className="absolute top-2 right-8" onClick={onClose}>
        <img className="w-6 mx-3 rounded-full" src={closeIcon} alt="Close Icon" />
        </button>
          <h2 className="font-semibold text-lg text-white py-4">
            Create Account
          </h2>
          <div className="flex justify-center">
            <a href="http://localhost:3000/auth/google" className="flex text-xs font-medium text-white items-center justify-center bg-customLightBlue hover:bg-customBlue active:bg-customLightBlue w-full py-2 rounded transition duration-200">
              <img className="w-6 mx-3 bg-white rounded-full" src={google} alt="Google Icon" />
              Sign up with Google
            </a>
          </div>
          <div className="inline-flex items-center justify-center py-2">
            <hr className="w-64 h-px my-8 border-0 bg-gray-700" />
            <span className="absolute px-3 font-medium text-white bg-mainBlack rounded" style={{ left: "50%", transform: "translateX(-50%)" }}>
              or
            </span>
          </div>
          <div className="flex flex-col space-y-3">
            <input
              type="text"
              className="rounded pl-3 py-2 bg-mainBlack border border-gray-700 text-sm text-white focus:outline-none focus:ring-2 focus:ring-gray-700"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="text"
              className="rounded pl-3 py-2 bg-mainBlack border border-gray-700 text-sm text-white focus:outline-none focus:ring-2 focus:ring-gray-700"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              className="rounded pl-3 py-2 bg-mainBlack border border-gray-700 text-sm text-white focus:outline-none focus:ring-2 focus:ring-gray-700"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              className="bg-white hover:bg-gray-500 active:bg-white font-medium text-mainBlack text-xs py-3 rounded transition duration-200"
              onClick={handleSignUp}
            >
              Sign Up
            </button>
          </div>
          {error && <span className="pt-2 text-red-500 h-4">{error}</span>}
        </div>
      </div>
    </div>
  );
};

export default SignupModal;
