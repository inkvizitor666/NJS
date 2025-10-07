export const incrementation = (n1, n2) => n1 + n2;
export const decrementation = (n1, n2) => n1 - n2;
export const multiplication = (n1, n2) => n1 * n2;
export const division = (n1, n2) => n1 / n2;

export function getOperationFunc(sign) {
  switch (sign) {
    case "+":
      return incrementation;
    case "-":
      return decrementation;
    case "*":
      return multiplication;
    case "/":
      return division;
    default:
      console.log("ERR");
      return null;
  }
}