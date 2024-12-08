export const isValidExpression = (expr: string): boolean => {
  const validChars = /^[0-9+\-*/^x() ]+$/;
  return validChars.test(expr);
};

export const evaluateExpression = (expression: string, x: number): number => {
  try {
    // Replace '^' with '**'
    const fn = new Function("x", `return ${expression.replace(/\^/g, "**")}`);
    return fn(x);
  } catch {
    return NaN;
  }
};
