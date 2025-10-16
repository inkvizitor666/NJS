export const incrementation = (n1: number, n2: number) => n1 + n2;
export const decrementation = (n1: number, n2: number) => n1 - n2;
export const multiplication = (n1: number, n2: number) => n1 * n2;
export const division = (n1: number, n2: number) => n1 / n2;

export function getOperationFunc(sign: string) {
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
      console.log("ERR2");
      return null;
  }
}
