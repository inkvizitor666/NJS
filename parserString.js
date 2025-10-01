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

module.exports = {
    parserString,
    parserStringTest
}