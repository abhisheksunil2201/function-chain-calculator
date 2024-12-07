"use client";

import { useState } from "react";

export const FunctionCard: React.FC = () => {
  const [equation, setEquation] = useState("");
  const handleEquationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEquation = e.target.value;
    setEquation(newEquation);
  };

  return (
    <div className="relative border-2 border-gray-400 rounded-lg p-4 w-64 text-center bg-white">
      {/* Connector Lines */}

      <input
        type="text"
        value={equation}
        onChange={handleEquationChange}
        className={`w-full px-2 py-1 border rounded`}
        placeholder="Enter equation (e.g., x + 1)"
      />
      <select disabled className="mt-2 w-full opacity-70 bg-gray-100">
        <option>Function</option>
      </select>
    </div>
  );
};
