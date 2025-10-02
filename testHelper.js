

//функция принимает аргумент testCase(массив с обьектами с ключами  arg и result) и передает arg в функцию, при правильном результате говорит ЗВЕБУМБА при отрицательном результате ХУЙ

function testFunction(testFn,testCases) {
  if(!testCases)
  {
    throw new Error('шары разуй тут пусто');
  }
  testCases.forEach((testCase) => {
    const result = testFn(testCase.arg);
    if (
      JSON.stringify(testCase.result) ===
      JSON.stringify(result)
    ) {
      console.log("заебумба");
    } else {
      console.log("хуй");
    }
  });
  return ;
}

module.exports = {
    testFunction
}