//const {namePeople} = require('./exampleModule.js');
//const {age1} = require('./exampleModule.js');
//const {age1,namePeople} = require('./exampleModule.js');
//console.log(namePeople);
//console.log(age1);

const { getOperationFunc } = require("./mathOperations.js");
const { parserString } = require("./parserString.js");
const {testFunction} = require('./testHelper.js');

function calculate(str) {
  const args = parserString(str);

  //console.log(args);

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


  const testCasesCalculate = [
    {
      arg: "1+1",
      result: 2,
    },
    {
      arg: "2*2",
      result: 4,
    },
  ];

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

testFunction(parserString,testCases);
testFunction(calculate,testCasesCalculate);
//console.log(calculate("4-6*4-1167+2*336"));
//calculateTest();
