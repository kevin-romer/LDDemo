import React from "react";

const levels = [
  { level: 1, color: "bg-green-600", meaning: "Minimal" },
  { level: 2, color: "bg-yellow-500", meaning: "Elevated" },
  { level: 3, color: "bg-orange-500", meaning: "Significant" },
  { level: 4, color: "bg-red-600", meaning: "Severe" },
  { level: 5, color: "bg-purple-700", meaning: "Critical" },
];

export const SeverityScale: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto my-12">
      <h3 className="text-2xl font-semibold text-blue-900 mb-6 text-center">
        Disaster Severity Scale
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {levels.map(({ level, color, meaning }) => (
          <div key={level} className={`flex flex-col items-center p-4 rounded shadow ${color} text-white`}>
            <div className="text-3xl font-bold mb-2">Level {level}</div>
            <div className="text-lg font-medium">{meaning}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
