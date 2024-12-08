"use client";

import ConnectionLines from "@/components/ConnectionLines";
import { FunctionCard } from "@/components/FunctionCard";
import { useFunctionChain } from "@/hooks/useFunctionChain";

export default function Home() {
  const {
    initialInput,
    setInitialInput,
    equations,
    updateEquation,
    result,
    functionChain,
  } = useFunctionChain();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 font-[family-name:var(--font-geist-sans)]">
      <div className="w-full h-full">
        <div className="flex relative justify-center items-center mb-8 h-full w-full">
          {functionChain.map((func) => {
            if (func.label === "Input") {
              return (
                <div
                  className="mb-8 text-center absolute h-full"
                  key={func.id}
                  style={{
                    left: `${func.posX}px`,
                    top: `${func.posY}px`,
                  }}
                >
                  <label className="block mb-2 font-semibold text-xs bg-[#E29A2D] text-white rounded-2xl px-4 py-2">
                    Initial value of x
                  </label>
                  <div className="border-[2.5px] border-[#E29A2D] rounded-2xl w-32 h-14 flex items-center bg-white">
                    <input
                      type="number"
                      value={initialInput}
                      onChange={(e) => setInitialInput(e.target.value)}
                      className="px-4 py-2 text-center w-full rounded-2xl flex-[0.8] focus:outline-none font-extrabold"
                    />
                    <div className="w-[0.1px] h-14 bg-[#E29A2D]" />
                    <div
                      className="rounded-full w-4 h-4 border-2 border-gray-300 m-4 mr-2"
                      id={`input-0`}
                    />
                  </div>
                </div>
              );
            } else if (func.label === "Output") {
              return (
                <div
                  className="text-center absolute"
                  key={func.id}
                  style={{
                    left: `${func.posX}px`,
                    top: `${func.posY}px`,
                  }}
                >
                  <label className="block mb-2 font-semibold text-xs bg-[#2DD179] text-white rounded-2xl px-4 py-2">
                    Final Output y
                  </label>
                  <div className="border-[2.5px] border-[#2DD179] rounded-2xl w-32 h-14 flex items-center bg-white">
                    <div
                      className="rounded-full w-4 h-4 border-2 border-gray-300 m-3"
                      id={`input-6`}
                    />
                    <div className="w-[0.1px] h-14 bg-[#2DD179]" />
                    <div className="px-4 py-2 text-center w-full rounded-2xl flex-[0.8] focus:outline-none font-extrabold">
                      {result}
                    </div>
                  </div>
                </div>
              );
            }
            return (
              <FunctionCard
                key={func.id}
                config={func}
                equation={equations[func.id]}
                onEquationChange={(newEquation) =>
                  updateEquation(func.id, newEquation)
                }
                posX={func.posX}
                posY={func.posY}
              />
            );
          })}
        </div>
        <ConnectionLines />
      </div>
    </div>
  );
}
