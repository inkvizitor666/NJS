//функция принимает аргумент testCase(массив с обьектами с ключами  arg и result) и передает arg в функцию, при правильном результате говорит ЗВЕБУМБА при отрицательном результате ХУЙ

function testFunction(testFn: any, testCases: any) {
  if (!testCases) {
    throw new Error("шары разуй тут пусто");
  }
  testCases.forEach((testCase: any) => {
    const result = testFn(testCase.arg);
    const isEqel = JSON.stringify(testCase.result) === JSON.stringify(result);

    const message = `\nтестирование функции\t${testFn.name}\nпередаваемый аргумент \t${
      testCase.arg
    },\nожидаемый результат \t${testCase.result},\nфактический результат \t${result},\n${
      isEqel ? `тест пройден ${String.fromCodePoint(0x2705)}` : `тест не пройден ${String.fromCodePoint(0x1f621)}`
    }`;
    const fnLog = isEqel ? console.info : console.error;

    fnLog(message);
  });
  return;
}

export { testFunction };
