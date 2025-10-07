//const {namePeople} = require('./exampleModule.js');
//const {age1} = require('./exampleModule.js');
//const {age1,namePeople} = require('./exampleModule.js');
//console.log(namePeople);
//console.log(age1);

import { getOperationFunc } from "./mathOperations.mjs";
import { parserString as myParsString } from"./parserString.mjs";
import { testFunction } from"./testHelper.mjs";

function calculate(str) {
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

const testCasesCalculate = [
  {
    arg: "2/2",
    result: 1,
  },
  {
    arg: "2+2",
    result: 4,
  },
  {
    arg: "1+2*2",
    result: 5,
  },
  {
    arg: "2*2+1",
    result: 5,
  },
  {
    arg: "2*2+1*10",
    result: 14,
  },
  {
    arg: "200*2/1*190",
    result: 76000,
  },
];


testFunction(calculate, testCasesCalculate);
//console.log(calculate("4-6*4-1167+2*336"));
//calculateTest();
