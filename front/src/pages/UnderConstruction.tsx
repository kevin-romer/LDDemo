import React from "react";
import { useNavigate } from "react-router";

export const UnderConstruction: React.FC = () => {
  const navigate = useNavigate()
  return (
    <div className="flex-grow flex items-center justify-center">
      <div className="bg-white p-10 rounded shadow max-w-md text-center">
        <h1 className="text-3xl font-semibold text-blue-900 mb-4">
          This Page Is Under Construction
        </h1>
        <p className="text-gray-700 mb-6">
          We're actively working to bring this section online. Please check back soon for updates.
        </p>
        <button onClick={() => navigate("/")} className="bg-blue-700 text-white px-6 py-3 rounded-lg hover:bg-blue-800 cursor-pointer">
          Return to Home
        </button>
      </div>
    </div>
  );
};
