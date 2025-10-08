import { getOperationFunc } from "../mathOperations.ts";
import { parserString as myParsString } from "../parserString/parserString.ts";

export function calculate(str: string) {
  const args = myParsString(str);
  const argsRedon = [args[0]];

  for (let i = 1; i < args.length; i = i + 2) {
    const sign = args[i];
    const buf = args[i + 1];
    const buf2 = argsRedon[argsRedon.length - 1];
    if (typeof sign != "string") {
      throw Error;
    }
    const currentOperation = getOperationFunc(sign);
    if (
      typeof buf2 != "number" ||
      typeof buf != "number" ||
      !currentOperation
    ) {
      throw Error;
    }

    if (sign == "*" || sign == "/") {
      argsRedon[argsRedon.length - 1] = currentOperation(buf2, buf);
    } else {
      argsRedon.push(sign, buf);
    }
  }

  let result = argsRedon[0];
  if (typeof result != "number") {
    throw Error;
  }

  if (argsRedon.length === 1) {
    return result;
  }

  for (let i = 1; i < argsRedon.length; i = i + 2) {
    const sign = argsRedon[i];
    const buf = argsRedon[i + 1];
    if (typeof sign != "string" || typeof buf != "number") {
      throw Error;
    }
    const currentOperation = getOperationFunc(sign);
    if (!currentOperation) {
      throw Error;
    }
    result = currentOperation(result, buf);
  }
  return result;
}
