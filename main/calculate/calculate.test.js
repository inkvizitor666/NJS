import { testFunction } from "../testHelper.js";
import { calculate } from "./calculate.ts";

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