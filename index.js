//const {namePeople} = require('./exampleModule.js');
//const {age1} = require('./exampleModule.js');
const {age1,namePeople} = require('./exampleModule.js');

console.log(namePeople);
console.log(age1);

const incrementation = (n1, n2) => n1 + n2;
const decrementation = (n1, n2) => n1 - n2;
const multiplication = (n1, n2) => n1 * n2;
const division = (n1, n2) => n1 / n2;

function getOperationFunc(sign) {
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

function calculate(str) {
  const args = parserString(str);

  console.log(args);

  const argsRedon = [];

  for (let i = 1; i < args.length; i = i + 2) {
    const sign = args[i];
    const buf = args[i + 1];
    const currentOperation = getOperationFunc(sign);

    if (sign == "*" || sign == "/") {
      const buf2 = args[i - 1];
      argsRedon[argsRedon.length - 1] = currentOperation(buf2, buf);
    } else {
      if (i == 1) {
        argsRedon.push(args[0]);
      }
      argsRedon.push(sign, buf);
    }
  }
  let result = argsRedon[0];

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

function parserString(string) {
  let arrPars = [];

  for (let i = 0; i < string.length; i++) {
    const num = Number(string[i]);
    if (Number.isNaN(num)) {
      arrPars.push(string[i]);
    } else {
      const lastIndex = arrPars.length - 1;
      const lastElementItem = arrPars[lastIndex];
      if (!Number.isNaN(Number(lastElementItem))) {
        arrPars[lastIndex] = Number(`${lastElementItem}${string[i]}`);
      } else {
        arrPars.push(num);
      }
    }
  }
  return arrPars;
}

function parserStringTest() {
  const testCases = [
    {
      arg: "4-6*4-1+2*6",
      result: [4, "-", 6, "*", 4, "-", 1, "+", 2, "*", 6],
    },
    {
      arg: "4-6*4-1167+2*336",
      result: [4, "-", 6, "*", 4, "-", 1167, "+", 2, "*", 336],
    },
  ];

  testCases.forEach((testCase) => {
    if (
      JSON.stringify(testCase.result) ===
      JSON.stringify(parserString(testCase.arg))
    ) {
      console.log("заебумба");
    } else {
      console.log("хуй");
    }
    console.log(testCase.result);
    console.log(parserString(testCase.arg));
  });
  return;
}

//console.log(calculate("4-6*4-1167+2*336"));
