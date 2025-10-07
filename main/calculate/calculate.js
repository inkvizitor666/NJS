import { getOperationFunc } from "../mathOperations.js";
import { parserString as myParsString } from"../parserString/parserString.js";

export function calculate(str) {
  const args = myParsString(str);

  const argsRedon = [args[0]];

  for (let i = 1; i < args.length; i = i + 2) {
    const sign = args[i];
    const buf = args[i + 1];
    const currentOperation = getOperationFunc(sign);

    if (sign == "*" || sign == "/") {
      const buf2 = argsRedon[argsRedon.length - 1];
        argsRedon[argsRedon.length - 1] = currentOperation(buf2, buf);
    } else {
      argsRedon.push(sign, buf);
    }
  }

  let result = argsRedon[0];
  if(argsRedon.length === 1)
  {
    return result;
  }

  for (let i = 1; i < argsRedon.length; i = i + 2) {
    const sign = argsRedon[i];
    const buf = argsRedon[i + 1];
    const currentOperation = getOperationFunc(sign);
    if (currentOperation) {
      result = currentOperation(result, buf);
    }
  }
  return result;
}