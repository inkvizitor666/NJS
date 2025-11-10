import { parserString } from "./parserString";
import { testFunction } from "../testHelper";

const testCases = [
  {
    arg: "4-6*4-1+2*6",
    result: [4, "-", 6, "*", 4, "-", 1, "+", 2, "*", 6],
  },
  {
    arg: "4-6*4-1167+2*336",
    result: [4, "-", 6, "*", 4, "-", 1167, "+", 2, "*", 336],
  },
  {
    arg: "4*6*4-1167+2*336",
    result: [4, "*", 6, "*", 4, "-", 1167, "+", 2, "*", 336],
  },
];

testFunction(parserString, testCases);
