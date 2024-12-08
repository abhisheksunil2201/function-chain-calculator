export const isValidExpression = (expr: string): boolean => {
  const validChars = /^[0-9+\-*/^x() ]+$/;
  return validChars.test(expr);
};

export const evaluateExpression = (expression: string, x: number): number => {
  try {
    const sanitizedExpression = expression
      .replace(/\^/g, "**")
      .replace(/\s/g, "")
      .replace(/(\d+)x/g, "$1 * x")
      .replace(/x/g, `(${x})`);
    const fn = new Function("return " + sanitizedExpression);
    const result = fn();
    if (typeof result !== "number" || isNaN(result)) {
      throw new Error("Invalid calculation");
    }

    return result;
  } catch (error) {
    console.error("Expression evaluation error:", error);
    return NaN;
  }
};
