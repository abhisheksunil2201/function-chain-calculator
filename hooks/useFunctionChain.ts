// src/hooks/useFunctionChain.ts
"use client";

import { evaluateExpression, isValidExpression } from "@/utils/utils";
import { useState, useMemo, useCallback } from "react";

export interface FunctionConfig {
  id: number;
  label: string;
  nextFunction?: number;
  posX: string;
  posY: string;
}

export const useFunctionChain = () => {
  const [initialInput, setInitialInput] = useState("0");
  const [equations, setEquations] = useState<{ [key: number]: string }>({
    1: "x + 1",
    2: "x * 2",
    3: "x",
    4: "x ^ 2",
    5: "x - 1",
  });

  const calculateChainResult = useCallback(() => {
    let currentValue = Number(initialInput);
    const executionOrder = [1, 2, 4, 5, 3];

    for (const funcId of executionOrder) {
      const equation = equations[funcId];
      if (!isValidExpression(equation)) {
        return "Invalid Equation";
      }
      currentValue = evaluateExpression(equation, currentValue);
    }

    return currentValue.toFixed(2);
  }, [initialInput, equations]);

  const result = useMemo(calculateChainResult, [calculateChainResult]);

  const updateEquation = (id: number, newEquation: string) => {
    setEquations((prev) => ({
      ...prev,
      [id]: newEquation,
    }));
  };

  const FUNCTION_CHAIN: FunctionConfig[] = [
    { id: 0, label: "Input", nextFunction: 1, posX: "60", posY: "-110" },
    { id: 1, label: "Function: 1", nextFunction: 2, posX: "300", posY: "-300" },
    { id: 2, label: "Function: 2", nextFunction: 4, posX: "800", posY: "-300" },
    { id: 3, label: "Function: 3", posX: "1300", posY: "-300" },
    { id: 4, label: "Function: 4", nextFunction: 5, posX: "550", posY: "100" },
    { id: 5, label: "Function: 5", nextFunction: 3, posX: "1050", posY: "100" },
    { id: 6, label: "Output", posX: "1660", posY: "-110" },
  ];

  return {
    initialInput,
    setInitialInput,
    equations,
    updateEquation,
    result,
    functionChain: FUNCTION_CHAIN,
  };
};
