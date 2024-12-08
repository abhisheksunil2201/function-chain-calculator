"use client";

import { FunctionConfig } from "@/hooks/useFunctionChain";
import { isValidExpression } from "@/utils/utils";

interface FunctionCardProps {
  config: FunctionConfig;
  equation: string;
  onEquationChange: (newEquation: string) => void;
  posX: string;
  posY: string;
}

export const FunctionCard: React.FC<FunctionCardProps> = ({
  config,
  equation,
  onEquationChange,
  posX,
  posY,
}) => {
  const handleEquationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEquation = e.target.value;
    onEquationChange(newEquation);
  };

  return (
    <div
      className={`absolute border-2 border-gray-300 rounded-lg p-4 w-64 text-center bg-white flex flex-col items-start`}
      style={{
        left: `${posX}px`,
        top: `${posY}px`,
      }}
    >
      <div className="flex gap-1 text-gray-400 items-center mb-6">
        <Grab className="text-gray-300" />
        <p>{config.label}</p>
      </div>

      <label htmlFor="equation" className="block text-md font-medium">
        Equation
      </label>
      <input
        id="equation"
        type="text"
        value={equation}
        onChange={handleEquationChange}
        className={`w-full px-2 py-1 border rounded-lg mb-4 ${
          isValidExpression(equation)
            ? "border-gray-300"
            : "border-red-500 text-red-500"
        }`}
        placeholder="Enter equation (e.g., x + 1)"
      />

      <label htmlFor="nextFunc" className="block text-md font-medium">
        Next function
      </label>
      <div className="flex w-full relative">
        <select
          id="nextFunc"
          disabled
          className="w-full mb-4 px-2 py-1 rounded-lg bg-gray-50 border border-gray-300 text-gray-900 appearance-none"
        >
          <option>
            {config.nextFunction ? `Function ${config.nextFunction}` : "-"}
          </option>
        </select>
        <ChevronDown className="text-gray-300 absolute right-1.5 top-1.5" />
      </div>
      <div className="flex justify-between items-center w-full mt-6 text-sm">
        <div className="flex items-center gap-1">
          <div
            className="rounded-full w-4 h-4 border-2 border-gray-300"
            id={`input-${config.id}`}
          ></div>
          <p>input</p>
        </div>
        <div className="flex items-center gap-1">
          <p>output</p>
          <div
            className="rounded-full w-4 h-4 border-2 border-gray-300"
            id={`output-${config.id}`}
          ></div>
        </div>
      </div>
    </div>
  );
};

const Grab = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <circle cx="12" cy="9" r="1" />
    <circle cx="19" cy="9" r="1" />
    <circle cx="5" cy="9" r="1" />
    <circle cx="12" cy="15" r="1" />
    <circle cx="19" cy="15" r="1" />
    <circle cx="5" cy="15" r="1" />
  </svg>
);

const ChevronDown = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="m6 9 6 6 6-6" />
  </svg>
);
