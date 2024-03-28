import { useState } from "react";
import google from "../../../assets/icons/google.svg";
import bgImage from "../../../assets/img/bg-image.jpg";
import SignupModal from "./components/SignupModal";

const Login = () => {
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);

  const toggleSignupModal = () => {
    setIsSignupModalOpen(!isSignupModalOpen);
  };
  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{backgroundImage: `url(${bgImage})`}}
    >
      <div className="relative flex flex-col md:flex-row m-6 space-y-10 rounded-2xl bg-mainBlack bg-opacity-70">
        <div className="p-8 md:p-20 flex flex-col justify-center">
          <h2 className="font-semibold text-lg text-white py-4">
            Log in to your account
          </h2>
          <div className="flex justify-center">
            <button className="flex text-xs font-medium text-white items-center justify-center bg-customLightBlue hover:bg-customBlue active:bg-customLightBlue w-full py-2 rounded transition duration-200">
              <img className="w-6 mx-3 bg-white rounded-full" src={google} />
              Log in with Google
            </button>
          </div>
          <div className="inline-flex items-center justify-center py-2">
            <hr className="w-64 h-px my-8 border-0 bg-gray-700" />
            <span
              className="absolute px-3 font-medium  text-white bg-mainBlack rounded"
              style={{left: "50%", transform: "translateX(-50%)"}}
            >
              or
            </span>
          </div>
          <div className="flex flex-col space-y-3">
            <input
              type="text"
              className="rounded pl-3 py-2 bg-mainBlack border border-gray-700 text-sm text-white focus:outline-none focus:ring-2 focus:ring-gray-700"
              placeholder="Enter your email"
            />
            <input
              type="password"
              className="rounded pl-3 py-2 bg-mainBlack border border-gray-700 text-sm text-white focus:outline-none focus:ring-2 focus:ring-gray-700"
              placeholder="Enter your password"
            />
            <button className="bg-white hover:bg-gray-500 active:bg-white font-medium text-mainBlack text-xs py-3 rounded transition duration-200">
              Continue
            </button>
          </div>
          <span className="pt-12 text-white text-sm" onClick={toggleSignupModal}>
            Don't have an account? Sign up
          </span>
        </div>
      </div>
      {isSignupModalOpen && <SignupModal onClose={toggleSignupModal} />}
    </div>
  );
};

export default Login;
