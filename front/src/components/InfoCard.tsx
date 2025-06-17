import React from "react";
import { Link } from "react-router";
import type { InfoCardProps } from "../types/types";

export const InfoCard: React.FC<InfoCardProps> = ({ title, description, linkText, linkTo }) => {
  return (
    <div className="bg-white p-6 rounded shadow hover:shadow-lg transition flex flex-col h-full">
      <h3 className="text-xl font-semibold text-blue-900 mb-4">{title}</h3>
      <p className="text-gray-700 mb-4">{description}</p>
      <Link to={linkTo} className="text-blue-700 font-medium hover:underline">
        {linkText}
      </Link>
    </div>
  );
};
