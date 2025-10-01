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

//функция принимает аргумент testCase(массив с обьектами с ключами  arg и result) и передает arg в функцию, при правильном результате говорит ЗВЕБУМБА при отрицательном результате ХУЙ

function testFunction(testCases) {
  if(!testCases)
  {
    throw new Error('шары разуй тут пусто');
  }
  testCases.forEach((testCase) => {
    const result = parserString(testCase.arg);
    if (
      JSON.stringify(testCase.result) ===
      JSON.stringify(result)
    ) {
      console.log("заебумба");
    } else {
      console.log("хуй");
    }
    console.log(testCase.result);
    console.log(result);
  });
  return ;
}

module.exports = {
    parserString,
    testFunction
}